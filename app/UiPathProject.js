import * as path from "path";
import * as fs from "fs";

/**
 * Represents the information contained in the UiPath project.json file.
 * [UiPath documentation]{@link https://studio.uipath.com/docs/about-the-projectjson-file} on this file.
 */
export class UiPathProject {

  /**
   * Construct a new object.
   *
   * Parse the project.json file that contains information about the UiPath project. To be exposed by the methods of this class.
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
    this.projectPath = projectPath;
  }

  /**
   * Return the name of the UiPath project.
   *
   * @returns {string} The Name of the UiPath project or an empty string if it is not found.
   * @since 1.0.0
   */
  getName() {
    if ( typeof( this.fileContents.name ) === "undefined" ) {
      return "";
    } else {
      return this.fileContents.name.toString();
    }
  }

  /**
   * Return the description of the UiPath project.
   *
   * @returns {string} The description of the UiPath project or an empty string if it is not found.
   * @since 1.0.0
   */
  getDescription() {
    if ( typeof( this.fileContents.description ) === "undefined" ) {
      return "";
    } else {
      return this.fileContents.description.toString();
    }
  }

  /**
   * Return the project version of the UiPath project.
   *
   * @returns {string} The project version of the UiPath project or an empty string if it is not found.
   * @since 1.0.0
   */
  getVersion() {
    if ( typeof( this.fileContents.projectVersion ) === "undefined" ) {
      return "";
    } else {
      return this.fileContents.projectVersion.toString();
    }
  }

  /**
   * Return the schema version of the project.json file.
   *
   * @returns {number} The schema version number.
   * @since 1.2.0
   */
  getSchemaVersion() {
    if ( typeof( this.fileContents.schemaVersion ) === "undefined" ) {
      return Number.NaN;
    } else {
      let schemaVersion = Number.parseFloat( this.fileContents.schemaVersion );

      if ( Number.isNaN( schemaVersion ) === true ) {
        return Number.NaN;
      }

      return schemaVersion;
    }
  }

  /**
   * Return a flag indicating if this project is a library or not.
   *
   * @returns {boolean} True if the project is a library, false if it is not.
   * @since 1.0.0
   */
  isLibrary() {

    // Check the schema version prior to checking if this is a library or not.
    let schemaVersion = this.getSchemaVersion();

    if ( schemaVersion < 4 ) {
      if ( typeof( this.fileContents.projectType ) === "undefined" ) {
        return false;
      } else if ( this.fileContents.projectType === "Library" ) {
        return true;
      } else {
        return false;
      }
    } else {
      if ( typeof( this.fileContents.designOptions ) === "undefined" ) {
        return false;
      } else if ( this.fileContents.designOptions.outputType === "undefined" ) {
        return false;
      } else if ( this.fileContents.designOptions.outputType === "Library" ) {
        return true;
      } else {
        return false;
      }
    }

  }

  /**
   * Return an array of workflows that have been marked as private.
   * These workflows are not exposed by a library.
   *
   * @returns {Array} An array of workflow file names.
   * @since 1.0.0
   */
  getPrivateWorkflows() {

    // Check the schema version prior to finding private workflows.
    let schemaVersion = this.getSchemaVersion();

    if ( schemaVersion < 4 ) {

      if ( typeof( this.fileContents.libraryOptions ) === "undefined" ) {
        return [];
      } else if (  typeof( this.fileContents.libraryOptions.privateWorkflows ) === "undefined" ) {
        return [];
      } else if ( !Array.isArray( this.fileContents.libraryOptions.privateWorkflows ) ) { // eslint-disable-line max-len
        return [];
      } else {
        let privateWorkflows = this.fileContents.libraryOptions.privateWorkflows;
        let self = this;

        privateWorkflows = privateWorkflows.map( function( element ) {
          return path.join( self.projectPath, element );
        } );

        return privateWorkflows;
      }
    } else {
      if ( typeof( this.fileContents.designOptions ) === "undefined" ) {
        return [];
      } else if ( typeof( this.fileContents.designOptions.libraryOptions ) === "undefined" ) {
        return [];
      } else if ( typeof( this.fileContents.designOptions.libraryOptions.privateWorkflows ) === "undefined" ) {
        return [];
      } else {
        let privateWorkflows =
          this.fileContents.designOptions.libraryOptions.privateWorkflows;
        let self = this;

        privateWorkflows = privateWorkflows.map( function( element ) {
          return path.join( self.projectPath, element );
        } );

        return privateWorkflows;
      }
    }
  }

  /**
   * Return a map of NuGet packages that are dependencies for the UiPath project.
   *
   * @returns {Map} A map of project dependencies.
   * @since 1.0.0
   */
  getDependencies() {
    return new Map( Object.entries( this.fileContents.dependencies ) );
  }

  /**
   * Return an array of workflows that should be ignored.
   *
   * @returns {Array} An array of workflow file names.
   * @since 1.1.0
   */
  static getIgnoreFiles() {
    return [
      "ConstantValues.xaml"
    ];
  }

  /**
   * Return an array of directory names that should be ignored.
   *
   * @returns {Array} An array of path elements.
   * @since 1.1.0
   */
  static getIgnoreDirNames() {
    return [
      "node_modules"
    ];
  }
}
