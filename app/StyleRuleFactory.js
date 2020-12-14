import { UiPathProject } from "./UiPathProject.js";

import * as fs from "fs";
import * as path from "path";
import * as recursiveReaddirSync from "recursive-readdir-sync";
import * as TOML from "@iarna/toml";
import * as util from "util";
import * as xpath from "xpath";

// Load classes that have implemented the style rules.
import { ArgumentsMustHaveAnnotations } from "./rules/ArgumentsMustHaveAnnotations.js";
import { ArgumentsMustStartUpperCase  } from "./rules/ArgumentsMustStartUpperCase.js";
import { MainSequencesMustHaveAnnotations } from "./rules/MainSequencesMustHaveAnnotations.js";
import { MainFlowchartsHaveAnnotations } from "./rules/MainFlowchartsMustHaveAnnotations.js";
import { VariablesMustHaveAnnotations } from "./rules/VariablesMustHaveAnnotations.js";
import { VariablesMustStartLowerCase } from "./rules/VariablesMustStartLowerCase.js";
import { WarnArgumentsWithDefaultValues } from "./rules/WarnArgumentsWithDefaultValues.js";
import { WarnVariablesWithDefaultValues } from "./rules/WarnVariablesWithDefaultValues.js";
import { WorkflowsShouldNotContainCodeActivities } from "./rules/WorkflowsShouldNotContainCodeActivities.js";
import { ImportantActivitiesMustHaveAnnotations } from "./rules/ImportantActivitiesMustHaveAnnotations.js";

/**
 * The TomlError object as part of the [@iarna-toml]{@link https://github.com/iarna/iarna-toml} package.
 *
 * @typedef {Error} TomlError
 */

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

    // Filter out any ignored paths.
    let ignoreDirNames = UiPathProject.getIgnoreDirNames();

    ignoreDirNames.forEach( function( ignoreDirName ) {
      xamlFiles = xamlFiles.filter( function( element ) {
        return !element.includes( ignoreDirName );
      } );
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

  /**
   * Load a dataset from a TOML file.
   *
   * @param {string} datasetName Name of the dataset to load.
   * @returns {Map} The parsed TOML data as a Map object.
   * @throws {TypeError} Parameter datasetName is required and must be a string.
   * @throws {TomlError} If the TOML data cannot be parsed.
   * @since 1.2.0
   */
  static getTomlData( datasetName ) {
    if ( !datasetName || typeof( datasetName ) !== "string" ) {
      throw new TypeError( "datasetName parameter is required and must be a string" );
    }

    let fileName = util.format( "%s.toml", datasetName );

    let datasetPath = path.join( __dirname, "./toml/", fileName );

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if ( fs.existsSync( datasetPath ) === false ) {
      throw new Error( util.format(
        "Unable to find the TOML file for dataset '%s'",
        datasetName
        )
      );
    }

    //let xamlContent = fs.readFileSync( file );
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    let tomlContent = fs.readFileSync( datasetPath );
    let tomlObject = TOML.parse( tomlContent );

    return new Map(
      Object.entries( tomlObject.dataset )
    );
  }

  /**
   * Filter the results to a specific file.
   *
   * @param {Map} results The results to filter.
   * @param {string} filter The file name filter to apply.
   * @returns {Map} The results list containing only the files included by the filter.
   * @throws {TypeError} Parameter output is required and must be a Map.
   * @since 1.4.0
   */
  static filterResults( results, filter ) {

    let updatedResults = new Map();

    if ( !results || typeof( results ) !== "object" ) {
      throw new TypeError( "results parameter is required and must be a Map" );
    }

    if ( !filter || typeof( filter ) !== "string" ) {
      throw new TypeError( "filter parameter is required and must be a string" );
    }

    results.forEach( function( output, file ) {
      if ( file.endsWith( filter ) === true ) {
        updatedResults.set( file, output );
      }
    } );

    return updatedResults;
  }

 /**
  * Return the list of default style rules.
  *
  * @returns {Array} A list of default style ryles.
  * @since 1.4.0
  */
  static getDefaultStyleRules() {
    return [
      new ArgumentsMustHaveAnnotations( StyleRuleFactory.getXpathProcessor() ),
      new ArgumentsMustStartUpperCase( StyleRuleFactory.getXpathProcessor() ),
      new MainSequencesMustHaveAnnotations( StyleRuleFactory.getXpathProcessor() ),
      new MainFlowchartsHaveAnnotations( StyleRuleFactory.getXpathProcessor() ),
      new VariablesMustHaveAnnotations( StyleRuleFactory.getXpathProcessor() ),
      new VariablesMustStartLowerCase(  StyleRuleFactory.getXpathProcessor() ),
      new WarnArgumentsWithDefaultValues( StyleRuleFactory.getXpathProcessor() ),
      new WarnVariablesWithDefaultValues( StyleRuleFactory.getXpathProcessor() ),
      new WorkflowsShouldNotContainCodeActivities( StyleRuleFactory.getXpathProcessor() ),
      new ImportantActivitiesMustHaveAnnotations( StyleRuleFactory.getXpathProcessor() )
    ];
  }
}
