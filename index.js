const startTime = process.hrtime.bigint();

import { StyleRuleFactory } from "./app/StyleRuleFactory.js";
import { UiPathProject } from "./app/UiPathProject.js";

import commander from "commander";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import prettyMS from "pretty-ms";

const appPackage = require( "./package.json" );

const program = new commander.Command();
const log = console.log;

const error = chalk.bold.red;
const warn = chalk.bold.yellow;
const success = chalk.bold.green;

// Define basic program metadata.
program.version( appPackage.version, "-v, --version" )
  .description( "Lint UiPath projects against rules developed by the Flinders RPA team" )
  .option( "-i, --input <required>", "Path to UiPath project directory" )
  .option( "--dep-check", "Check for outdated project dependencies" )
  .option( "-q, --quiet", "Suppress warnings" )
  .option( "-r, --recursive", "Find XAML files in project sub directories" )
  .option( "-p, --include-private", "Include private workflows in library projects" )
  .option(  "-f, --filter <required>", "Filter list of output to a specific file" );

// Extend help with custom message.
program.on( "--help", function() {
  log( "" );
  log( "Ignored files:" );

  UiPathProject.getIgnoreFiles().forEach( function( name ) {
    log( "  - " + name );
  } );

  log( "" );
  log( "Ignored directory names:" );

  UiPathProject.getIgnoreDirNames().forEach( function( name ) {
    log( "  - " + name );
  } );
} );

// Parse the command line parameters.
program.parse( process.argv );

// Get the specified options.
const options = program.opts();

// Check for required input path option.
// If missing assume current working directory.
if ( typeof( options.input ) === "undefined" ) {
  options.input = process.cwd();
}

// Output some useful information.
log( chalk.bold( "RPA Lint - " + appPackage.version ) );

// Resolve a relative path if required.
if ( !path.isAbsolute( options.input ) ) {
  options.input = path.resolve( process.cwd().toString(), options.input );
} else {

  // Normalise the path for sanity.
  options.input = path.normalize( options.input );
}

// Get a list of files to process.
if ( options.recursive === true ) {
  log( "INFO: Searching recursively for XAML files" );
}

let xamlFiles = StyleRuleFactory.getXamlFileList(
  options.input,
  options.recursive
);

// Check to make sure XAML files were found.
if ( xamlFiles.length === 0 ) {
  log( error( "ERROR: " ) + "No XAML files found!" );
  process.exit( 1 );
}

// Get some information about the project.
const projectInfo = new UiPathProject( options.input );

log( "INFO: Project name: %s", projectInfo.getName() );
log( "INFO: Project version: %s", projectInfo.getVersion() );

// Output some additional information.
log( "INFO: Found %d files in %s", xamlFiles.length, options.input );

if ( options.quiet === true ) {
  log( warn( "WARN:" ) + " Warning messages are being suppressed" );
}

// Prepare to process the files.
let results = new Map;
let haveIssues = false;
let haveErrors = false;

// Load other classes that assess the project.
import { PublicWorkflowsMustHaveAnnotations } from "./app/rules/PublicWorkflowsMustHaveAnnotations.js";
import { NoOutdatedProjectDependencies } from "./app/rules/NoOutdatedProjectDependencies.js";

// Build a list of style rules.
let styleRules = StyleRuleFactory.getDefaultStyleRules();

let libraryStyleRules = [];
let libraryPublicWorkflows = [];

// Build a list of library specific style rules if required.
if ( projectInfo.isLibrary() === false && options.includePrivate === true ) {
  log( warn( "WARN: " ) + "--include-private option is only applicable to library projects" );
}

if ( projectInfo.isLibrary() ) {

  log( "INFO: UiPath Library project detected." );

  libraryStyleRules = [
    new PublicWorkflowsMustHaveAnnotations( StyleRuleFactory.getXpathProcessor() )
  ];

  libraryPublicWorkflows = StyleRuleFactory.filterPublicWorkflows(
    xamlFiles,
    projectInfo
  );

  // Filter out private workflows if required.
  if ( options.includePrivate !== true ) {
    log( "INFO: Ignoring private workflows." );
    xamlFiles = StyleRuleFactory.filterPublicWorkflows(
      xamlFiles,
      projectInfo
    );
  } else {
    log( "INFO: Including private workflows." );
  }
} else {
  log( "INFO: UiPath Process project detected." );
}

// Process the files.
xamlFiles.forEach( function( file ) {
  let output = {
    warnings: [],
    errors: []
  };

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  let xamlContent = fs.readFileSync( file );
  xamlContent = xamlContent.toString();

  // Apply the style rules to the XAML file.
  styleRules.forEach( function( styleRule ) {
    styleRule.checkStyleRule( xamlContent );

    output.warnings = output.warnings.concat( styleRule.getWarnings() );
    output.errors = output.errors.concat( styleRule.getErrors() );
  } );

  // Apply library specific style rules.
  if ( projectInfo.isLibrary() && libraryPublicWorkflows.includes( file ) ) {
    libraryStyleRules.forEach( function( libraryStyleRule ) {
      libraryStyleRule.checkStyleRule( xamlContent );

      output.warnings = output.warnings.concat( libraryStyleRule.getWarnings() );
      output.errors = output.errors.concat( libraryStyleRule.getErrors() );
    } );
  }

  // Were any issues found?
  if ( output.warnings.length > 0 || output.errors.length > 0 ) {
    haveIssues = true;
  }

  // Were any errors found?
  if ( output.errors.length > 0 ) {
    haveErrors = true;
  }

  results.set( file, output );

} );

// Suppress warnings if required.
if ( options.quiet === true ) {

  // Check to see if only warnings have been found.
  if ( haveErrors === false && haveIssues === true ) {

    // Reset the flag as only warnings have been found.
    haveIssues = false;
  }
}

// Filter the results list if required.
if ( options.filter !== undefined ) {
  log( warn( "WARN: " ) + "Results are filtered." );
  results = StyleRuleFactory.filterResults( results, options.filter );

  if ( results.size === 0 ) {
    haveIssues = false;
  }
}

// Were any issues found?
if ( haveIssues ) {
  log( "INFO: Found XAML files that do not pass validation." );

  // Output the found issues.
  results.forEach( function( output, file ) {

    // Are there any warnings?
    if ( output.warnings.length > 0 && program.quiet !== true ) {
      log( warn( "WARN: " ) + "Warnings for " + file );
      output.warnings.forEach( function( warning ) {
        log( " - %s", warning );
      } );
    }

    // Are there any errors?
    if ( output.errors.length > 0 ) {
      log( error( "ERROR: " ) + "Errors for " + file );
      output.errors.forEach( function( error ) {
        log( " - %s", error );
      } );
    }
  } );
}

// Check the UiPath project dependencies if required.
if ( options.depCheck ) {
  console.log( "INFO: Checking UiPath project dependencies. This will take some time..." );

  let depCheck = new NoOutdatedProjectDependencies( projectInfo );
  depCheck.checkStyleRule();

  let depErrors = depCheck.getErrors();

  depErrors.forEach( function( errorMsg ) {
    console.log( error( "ERROR: " ) + errorMsg );
  } );

  if ( depErrors.length > 0 ) {
    haveErrors = true;
  }
}

const endTime = process.hrtime.bigint();
const totalTime = Number( endTime - startTime ) * 1e-6;

log( "INFO: Elapsed time:", prettyMS( totalTime ) );

// Exit with an error status code for errors only, not warnings.
if ( haveErrors ) {
  log( error( "ERROR: " ) + "The identified errors must be addressed." );
  process.exit( 1 );
} if ( haveIssues ) {
  log( warn( "WARN: " ) + "The identified warnings should be addressed." );
} else {
  log( success( "Success: " ) + "No issues were detected." );
}
