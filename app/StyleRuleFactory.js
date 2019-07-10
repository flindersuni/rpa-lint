// Required modules.
const xpath = require( "xpath" );
const path = require( "path" );
const fs = require( "fs" );

//const dom = require( "xmldom" );

/**
 * Factory class to expose utility functions.
 *
 * @hideconstructor
 */
class StyleRuleFactory {

  /**
   * Return an object that lists supported XML namespaces.
   *
   * Each property is the namespace prefix.
   * Each property value is the namespace URI.
   *
   * @returns {object} An object listing supported namespaces.
   * @since 1.0.0
   */
  static getXamlNamespaces() {
    return {
      "xaml": "http://schemas.microsoft.com/netfx/2009/xaml/activities",
      "x": "http://schemas.microsoft.com/winfx/2006/xaml",
      "sap2010": "http://schemas.microsoft.com/netfx/2010/xaml/activities/presentation"
    };
  }

  /**
   * Get a new XPath processor object.
   *
   * @returns {xpath} A newly instantiates xpath object.
   * @since 1.0.0
   */
  static getXpathProcessor() {
    return xpath.useNamespaces(
      this.getXamlNamespaces()
    );
  }

  /**
   * Get a list of XAML files to check.
   *
   * @param {string} targetPath Path to the directory to search.
   * @returns {Array} An array of XAML file paths.
   * @throws {TypeError} Parameter targetPath is required and must be a string.
   * @since 1.0.0
   */
  static getXamlFileList( targetPath ) {
    if ( !targetPath || typeof targetPath !== "string" ) {
      throw new TypeError( "targetPath parameter is required and must be a string" );
    }

    // Get a list of files in the target directory.
    // Disable this rule as user is expected to provide a path.
    let fileList = fs.readdirSync( targetPath ); // eslint-disable-line security/detect-non-literal-fs-filename

    // Filter the list of files to only XAML files.
    let xamlFiles = fileList.filter( function( element ) {
      return path.extname( element ) === ".xaml" && path.basename( element ).startsWith( "~" ) === false;
    } );

    return xamlFiles;
  }

  /**
   * Parse and return the project.json file that contains information about the UiPath project.
   *
   * @param {string} projectPath Path to the root directory of the UiPath project.
   * @returns {object} The object represented in the project.json file.
   * @throws {TypeError} Parameter projectPath is required and must be a string.
   * @throws {Error} Reading or parsing the project.json file fails.
   * @since 1.0.0
   */
  static getUiPathProjectInfo( projectPath ) {
    if ( !projectPath || typeof projectPath !== "string" ) {
      throw new TypeError( "projectPath parameter is required and must be a string" );
    }

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const fileContents = fs.readFileSync( path.join( projectPath, "project.json" ) );
    return JSON.parse( fileContents );
  }
}

exports.StyleRuleFactory = StyleRuleFactory;
