import { BaseStyleRule } from "./BaseStyleRule.js";

import * as util from "util";
import * as xpath from "xpath";

export class ArgumentsMustStartUpperCase extends BaseStyleRule {

  /**
   * Construct a new object.
   *
   * @classdesc Implement the rule that all argument names must start with an upper case letter.
   * This is important as it makes it easier for others to differentiate between arguments and variables.
   * Especially when used in complex expressions.
   * @augments BaseStyleRule
   * @constructs
   * @param {xpath} xpath An XPath object with the required namespaces defined.
   * @since 1.0.0
   */
  constructor( xpath ) {
    super( xpath );

    this.xpathMatchAll = "/xaml:Activity/x:Members/x:Property";
  }

  /**
   * Return an array of errors as a result of the style check.
   *
   * @returns {Array} An array of error strings.
   * @since 1.0.0
   */
  getErrors() {

    let errors = [];

    // Check the names of the arguments.
    if ( this.lenientMatches.length > 0 ) {
      let nameList = this.getAttributeValues( "Name", this.lenientMatches );

      let self = this;

      nameList.forEach( function( name ) {
        if ( !self.isFirstCharUpperCase( name ) ) {
          errors.push(
            util.format( "The argument name '%s' must start with an upper case letter.", name )
          );
        }
      } );

    }

    return errors;
  }

  /**
   * Check to see if the supplied string starts with an upper case letter.
   *
   * @param {string} value The string to evaluate.
   * @returns {boolean} True if the string starts with an upper case letter.
   * @throws {TypeError} Parameter value is required and must be a string.
   * @since 1.0.0
   */
  isFirstCharUpperCase( value ) {
    if ( !value || typeof( value ) !== "string" ) {
      throw new TypeError( "value parameter is required and must be a string" );
    }

    let returnFlag = false;
    let firstChar = value.charAt( 0 );

    if ( firstChar === firstChar.toUpperCase() &&
         firstChar !== firstChar.toLowerCase() ) {
      returnFlag = true;
    }

    return returnFlag;
  }
}
