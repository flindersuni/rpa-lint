// Required modules.
const path = require( "path" );
const fs = require( "fs" );

/**
 * Class to make it easier to get UiPath project information.
 */
class UiPathProject {

  /**
   * Parse and return the project.json file that contains information about the UiPath project.
   *
   * @param {string} projectPath Path to the root directory of the UiPath project.
   * @throws {TypeError} Parameter projectPath is required and must be a string.
   * @throws {Error} Reading or parsing the project.json file fails.
   * @since 1.0.0
   */
  constructor( projectPath ) {
    if ( !projectPath || typeof projectPath !== "string" ) {
      throw new TypeError( "projectPath parameter is required and must be a string" );
    }

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const fileContents = fs.readFileSync( path.join( projectPath, "project.json" ) );
    return JSON.parse( fileContents );
  }

}

exports.UiPathProject = UiPathProject;
