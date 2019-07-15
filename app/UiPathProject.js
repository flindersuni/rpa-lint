// Required modules.
const path = require( "path" );
const fs = require( "fs" );

/**
 * Class to make it easier to get UiPath project information.
 */
class UiPathProject {

  /**
   * Parse the project.json file that contains information about the UiPath project.
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
    this.fileContents = JSON.parse( fs.readFileSync( path.join( projectPath, "project.json" ) ) );
  }

    /**
     * Return the name property of the UiPath project object.
     *
     * @returns {string} The Name of the UiPath project or an empty string if it is not found.
     */
    getName() {
      if ( typeof( this.fileContents.name ) === "undefined" ) {
        return "";
      } else {
        return this.fileContents.name.toString();
      }
    }

  /**
   * Return the description property of the UiPath project object.
   *
   * @returns {string} The description of the UiPath project or an empty string if it is not found.
   */
  getDescription() {
    if ( typeof( this.fileContents.description ) === "undefined" ) {
      return "";
    } else {
      return this.fileContents.description.toString();
    }
  }

  /**
   * Return the project version property of the UiPath project object.
   *
   * @returns {string} The project version of the UiPath project or an empty string if it is not found.
   */
  getVersion() {
    if ( typeof( this.fileContents.projectVersion ) === "undefined" ) {
      return "";
    } else {
      return this.fileContents.projectVersion.toString();
    }
  }

  /**
   * Return a flag indicating if this project is a library or not.
   *
   * @returns {boolean} True if the project is a library, false if it is not.
   */
  isLibrary() {
    if ( typeof( this.fileContents.projectType ) === "undefined" ) {
      return false;
    } else if ( this.fileContents.projectType === "Library" ) {
      return true;
    } else {
      return false;
    }
  }
}

exports.UiPathProject = UiPathProject;
