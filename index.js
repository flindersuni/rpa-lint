// Application dependencies.

const commander = require( "commander" );

const program = new commander.Command();

// Define basic program metadata.
program.version( "1.0.0", "-v, --version" )
  .description( "Check XAML files using rules developed by the Flinders RPA team" )
  .option( "-i, --input <required>", "Path to project directory" );

// Parse the command line parameters
program.parse( process.argv );

// Check for required arguments, if missing show help
if ( typeof program.input === "undefined" ) {
  program.help();
}
