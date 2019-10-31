import { BaseStyleRule } from "./BaseStyleRule.js";

import * as util from "util";
import * as xpath from "xpath";

/**
 * The DomParser object as part of the [xmldom]{@link https://www.npmjs.com/package/xmldom} package.
 *
 * @typedef {object} DomParser
 */

export class WarnArgumentsWithDefaultValues extends BaseStyleRule {

  /**
   * Construct a new object.
   *
   * @classdesc Implement the rule that warns when arguments contain default values.
   *
   * @augments BaseStyleRule
   *
   * @constructs
   *
   * @param {xpath} xpath An XPath object with the required namespaces defined.
   * @since 1.1.0
   */
  constructor( xpath ) {
    super( xpath );

    this.xpathMatchAll = "/xaml:Activity/x:Members/x:Property";

    // Maintain a list of arguments to always ignore.
    this.ignoreArgumentNameList = [
      "TestSuiteName",
      "TestResultsFolder",
      "TestOrder",
      "TestCategory",
      "TestEnvironmentBlackList"
    ];
  }

  /**
   * Return an array of warnings as a result of the style check.
   *
   * @returns {Array} An array of warning strings.
   * @since 1.1.0
   */
  getWarnings() {

    let warnings = [];
    let self = this;

    // Check the variables for default values.
    if ( this.lenientMatches.length > 0 ) {
      this.lenientMatches.forEach( function( element ) {

        // Get the name of the argument which is always available.
        let argumentName = element.getAttribute( "Name" );

        // Make sure this name isn't on the ignore list.
        if ( self.ignoreArgumentNameList.includes( argumentName ) === false ) {

          // Get the default value if one has been specified.
          let defaultValue = self.getArgumentDefaultValue( self.xamlDoc, argumentName );

          if ( defaultValue !== "" ) {
            warnings.push(
              util.format(
                "The argument with name '%s' has a default value. Check to ensure the value is appropriate.",
                element.getAttribute( "Name" )
              )
            );
          }
        }
      } );
    }

    return warnings;
  }

  /**
   * Get the name of the underlying class for this activity.
   *
   * @param {DomParser} xamlDoc The XAML code represented as an XML DOMParser object.
   *
   * @returns {string} The name of the underlying CLR class.
   * @throws {TypeError} Parameter xamlDoc is required and must be a DomParser object.
   * @since 1.1.0
   */
  getClassName( xamlDoc ) {
    if ( !xamlDoc || typeof( xamlDoc ) !== "object" ) {
      throw new TypeError( "xamlDoc parameter is required and must be an instance of DOMParser object" );
    }

    let activityElement = this.xpath( "/xaml:Activity", xamlDoc )[ 0 ];

    return activityElement.getAttribute( "x:Class" );

  }


  /**
   * Get the name of the underlying class for this activity.
   *
   * @param {DomParser} xamlDoc The XAML code represented as an XML DOMParser object.
   * @param {string} argumentName The name of the argument.
   *
   * @returns {string} The default value for the argument if it is specified.
   * @throws {TypeError} Parameter xamlDoc is required and must be a DomParser object.
   * @since 1.1.0
   */
  getArgumentDefaultValue( xamlDoc, argumentName ) {

    if ( !xamlDoc || typeof( xamlDoc ) !== "object" ) {
      throw new TypeError( "xamlDoc parameter is required and must be an instance of DOMParser object" );
    }

    if ( !argumentName || typeof( argumentName ) !== "string" ) {
      throw new TypeError( "argumentName parameter is required and must be a string" );
    }

    let className = this.getClassName( xamlDoc );
    let activityElement = this.xpath( "/xaml:Activity", xamlDoc )[ 0 ];

    let attributeName = util.format( "this:%s.%s", className, argumentName );

    if ( activityElement.hasAttribute( attributeName ) ) {
      return activityElement.getAttribute( attributeName );
    } else {
      return "";
    }
  }
}
