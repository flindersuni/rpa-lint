// Application dependencies.

const commander = require( "commander" );
const chalk = require( "chalk" );
const path = require( "path" );
const fs = require( "fs" );

const package = require( "./package.json" );

const StyleRuleFactory = require( "./app/StyleRuleFactory.js" ).StyleRuleFactory;

const program = new commander.Command();
const log = console.log;

const error = chalk.bold.red;
const warn = chalk.bold.yellow;
const success = chalk.bold.green;

// Define basic program metadata.
program.version( package.version, "-v, --version" )
  .description( "Check XAML files using rules developed by the Flinders RPA team" )
  .option( "-i, --input <required>", "Path to project directory" );

// Parse the command line parameters.
program.parse( process.argv );

// Check for required arguments, if missing show help.
if ( typeof program.input === "undefined" ) {
  program.help();
}

// Output some useful information.
log( chalk.bold( "Flinders XAML Style Check - " + package.version ) );

// Resolve a relative path if required.
if ( !path.isAbsolute( program.input ) ) {
  program.input = path.resolve( process.cwd().toString(), program.input );
} else {

  // Normalise the path for sanity.
  program.input = path.normalize( program.input );
}

// Get a list of files to process.
const xamlFiles = StyleRuleFactory.getXamlFileList( program.input );

// Check to make sure XAML files were found.
if ( xamlFiles.length === 0 ) {
  log( error( "ERROR: " ) + "No XAML files found!" );
  process.exitCode = 1;
}

// Output some additional information.
log( "INFO: Found %d files in %s", xamlFiles.length, program.input );

// Prepare to process the files.
let results = {};
let haveIssues = false;

const ArgumentsMustHaveAnnotations = require( "./app/ArgumentsMustHaveAnnotations.js" ).ArgumentsMustHaveAnnotations;
const VariablesMustHaveAnnotations = require( "./app/VariablesMustHaveAnnotations.js" ).VariablesMustHaveAnnotations;

// Process the files.
xamlFiles.forEach( function( file ) {
  let output = {
    warnings: [],
    errors: []
  };

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  let xamlContent = fs.readFileSync( path.join( program.input, file ) );
  xamlContent = xamlContent.toString();

  // Check the arguments.
  let styleCheck = new ArgumentsMustHaveAnnotations(
    StyleRuleFactory.getXpathProcessor()
  );
  styleCheck.checkStyleRule( xamlContent.toString() );

  output.warnings = output.warnings.concat( styleCheck.getWarnings() );
  output.errors = output.errors.concat( styleCheck.getErrors() );

  // Check the variables.
  styleCheck = new VariablesMustHaveAnnotations(
    StyleRuleFactory.getXpathProcessor()
  );

  styleCheck.checkStyleRule( xamlContent.toString() );

  output.warnings = output.warnings.concat( styleCheck.getWarnings() );
  output.errors = output.errors.concat( styleCheck.getErrors() );

  // Were any issues found?
  if ( output.warnings.length > 0 || output.errors.length > 0 ) {
    haveIssues = true;
  }

  // eslint-disable-next-line security/detect-object-injection
  results[ file ] = output;

} );

// Were any issues found?
if ( haveIssues ) {
  log( "INFO: Found XAML files that do not pass validation." );

  // Output the found issues.
  Object.keys( results ).forEach( function( file ) {
    // eslint-disable-next-line security/detect-object-injection
    let output = results[ file ];

    // Are there any warnings?
    if ( output.warnings.length > 0 ) {
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

  // Exit with an error status code.
  process.exitCode = 1;
} else {
  log( success( "Sucess: " + "No XAML style issues were detected." ) );
}
