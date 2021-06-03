import { BaseStyleRule } from "./BaseStyleRule.js";

import * as util from "util";
import * as xpath from "xpath";

export class NoArgumentsVariablesSameName extends BaseStyleRule {

  /**
   * Construct a new object.
   *
   * @classdesc Implement the rule that the arguments and variables cannot have the same names.
   * Argument and variable names are case insensitive in UiPath projects.
   * Therefore it is possible to have an argument and a variable with the same
   * name. If this happens unexpected behaviour is likely.
   * @augments BaseStyleRule
   * @constructs
   * @param {xpath} xpath An XPath object with the required namespaces defined.
   * @since 1.1.0
   */
  constructor( xpath ) {
    super( xpath );

    // Match all of the arguments.
    this.xpathMatchAll = "/xaml:Activity/x:Members/x:Property";

    // Match all of the variables.
    this.xpathMatchSpecific = "//xaml:Variable";
  }

  /**
   * Return an array of errors as a result of the style check.
   *
   * @returns {Array} An array of error strings.
   * @since 1.1.0
   */
  getErrors() {

    let errors = [];

    let argumentNameList = [];
    let variableNameList = [];

    let lowerArgumentNameList = [];
    let lowerVariableNameList = [];

    // Build a list of argument names.
    if ( this.lenientMatches.length > 0 ) {
      let nameList = this.getAttributeValues( "Name", this.lenientMatches );

      nameList.forEach( function( name ) {
        argumentNameList.push( name );
        lowerArgumentNameList.push( name.toLowerCase() );
      } );
    }

    // Build a list of variable names.
    if ( this.strictMatches.length > 0 ) {
      let nameList = this.getAttributeValues( "Name", this.strictMatches );

      nameList.forEach( function( name ) {
        variableNameList.push( name );
        lowerVariableNameList.push( name.toLowerCase() );
      } );
    }

    // Check the list of arguments against the list of variables.
    lowerArgumentNameList.forEach( function( argumentName, argumentIndex )  {

      let matchIndex = lowerVariableNameList.indexOf( argumentName );

      if ( matchIndex > -1 ) {
        errors.push(
          util.format(
            "The argument name '%s' conflicts with a variable of the same name '%s'.",
            // eslint-disable-next-line security/detect-object-injection
            argumentNameList[ argumentIndex ],
            // eslint-disable-next-line security/detect-object-injection
            variableNameList[ matchIndex ]
          )
        );
      }
    } );

    return errors;
  }
}
