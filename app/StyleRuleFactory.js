import { UiPathProject } from "./UiPathProject.js";
import * as recursiveReaddirSync from "recursive-readdir-sync";

import * as xpath from "xpath";
import * as path from "path";
import * as fs from "fs";

/**
 * Contains a number of static utility functions that are used throughout the app.
 *
 * @hideconstructor
 */
export class StyleRuleFactory {

  /**
   * Return an object that lists all of the supported XML namespaces.
   *
   * Each property name is the namespace prefix.
   * Each property value is the namespace URI.
   *
   * @returns {object} An object listing supported namespaces.
   * @since 1.0.0
   */
  static getXamlNamespaces() {
    return {
      "xaml": "http://schemas.microsoft.com/netfx/2009/xaml/activities",
      "x": "http://schemas.microsoft.com/winfx/2006/xaml",
      "sap2010": "http://schemas.microsoft.com/netfx/2010/xaml/activities/presentation",
      "ui": "http://schemas.uipath.com/workflow/activities",
      "this": "clr-namespace:"
    };
  }

  /**
   * Get a new XPath processor object.
   * [xpath package]{@link https://www.npmjs.com/package/xpath} documentation.
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
   * @param {boolean} recursive Flag to indicate recursive file search.
   * @returns {Array} An array of XAML file paths.
   * @throws {TypeError} Parameter targetPath is required and must be a string.
   * @since 1.2.0
   */
  static getXamlFileList( targetPath, recursive = false ) {
    if ( !targetPath || typeof( targetPath ) !== "string" ) {
      throw new TypeError( "targetPath parameter is required and must be a string" );
    }

    if ( typeof( recursive ) !== "boolean" ) {
      throw new TypeError( "recursive parameter must be a boolean" );
    }

    // Get a list of files in the target directory.
    let fileList = [];

    // Is a recursive search for files required?
    if ( recursive === true ) {

      // Yes.
      fileList = recursiveReaddirSync.default( targetPath );
    } else {

      // No.
      fileList = fs.readdirSync( targetPath ); // eslint-disable-line security/detect-non-literal-fs-filename

      // Ensure the list of files has the full path.
      fileList = fileList.map( function( element ) {
        return path.join( targetPath, element );
      } );
    }

    // Filter the list of files to only XAML files.
    let xamlFiles = fileList.filter( function( element ) {
      return path.extname( element ) === ".xaml" && path.basename( element ).startsWith( "~" ) === false;
    } );

    // Filter out any ignored files.
    let ignoreFiles = UiPathProject.getIgnoreFiles();

    xamlFiles = xamlFiles.filter( function( element ) {
      return ignoreFiles.indexOf( path.basename( element ) ) === -1;
    } );

    return xamlFiles;
  }

  /**
   * Filter the list of XAML files and only return those that are public.
   *
   * @param {Array} xamlFiles An array of XAML files.
   * @param {UiPathProject} projectInfo An instance of the UiPathProject object.
   * @returns {Array} An array of XAML files which are public.
   * @throws {TypeError} Parameter targetPath is required and must be a string.
   * @since 1.0.0
   */
  static filterPublicWorkflows( xamlFiles, projectInfo ) {
    if ( !Array.isArray( xamlFiles ) ) {
      throw new TypeError( "xamlFiles parameter is required and must be an Array" );
    }

    if ( !projectInfo || typeof( projectInfo ) !== "object" ) {
      throw new TypeError( "projectInfo parameter is required and must be an Array" );
    }

    let privateWorkflows = projectInfo.getPrivateWorkflows();

    if ( privateWorkflows.length === 0 ) {
      return xamlFiles;
    }

    // If the xaml file name does not exist in the list of private workflows it is public.
    let publicWorkflows = xamlFiles.filter( function( element ) {
      return !privateWorkflows.includes( element );
    } );

    return publicWorkflows;

  }
}
