import { BaseStyleRule } from "./BaseStyleRule.js";

import * as util from "util";
import * as xpath from "xpath";

export class VariablesMustStartLowerCase extends BaseStyleRule {

  /**
   * Construct a new object.
   *
   * @classdesc Implement the rule that all variable names must start with a lower case letter.
   * This is important as it makes it easier for others to differentiate between arguments and variables.
   * Especially when used in complex expressions.
   * @augments BaseStyleRule
   * @constructs
   * @param {xpath} xpath An XPath object with the required namespaces defined.
   * @since 1.0.0
   */
  constructor( xpath ) {
    super( xpath );

    this.xpathMatchAll = "//xaml:Variable";
  }

  /**
   * Return an array of errors as a result of the style check.
   *
   * @returns {Array} An array of error strings.
   * @since 1.0.0
   */
  getErrors() {

    let errors = [];

    // Check the names of the variables.
    if ( this.lenientMatches.length > 0 ) {
      let nameList = this.getAttributeValues( "Name", this.lenientMatches );

      let self = this;

      nameList.forEach( function( name ) {
        if ( !self.isFirstCharLowerCase( name ) ) {
          errors.push(
            util.format( "The variable name '%s' must start with a lower case letter.", name )
          );
        }
      } );

    }

    return errors;
  }

  /**
   * Check to see if the supplied string starts with a lower case letter.
   *
   * @param {string} value The string to evaluate.
   * @returns {boolean} True if the string starts with a lower case letter.
   * @throws {TypeError} Parameter value is required and must be a string.
   * @since 1.0.0
   */
  isFirstCharLowerCase( value ) {
    if ( !value || typeof( value ) !== "string" ) {
      throw new TypeError( "value parameter is required and must be a string" );
    }

    let returnFlag = false;
    let firstChar = value.charAt( 0 );

    if ( firstChar === firstChar.toLowerCase() &&
         firstChar !== firstChar.toUpperCase() ) {
      returnFlag = true;
    }

    return returnFlag;
  }
}
