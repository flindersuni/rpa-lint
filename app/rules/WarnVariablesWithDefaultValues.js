import { BaseStyleRule } from "./BaseStyleRule.js";

import * as util from "util";
import * as xpath from "xpath";

export class WarnVariablesWithDefaultValues extends BaseStyleRule {

  /**
   * Construct a new object.
   *
   * @classdesc Implement the rule that warns when variables contain default values.
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

    this.xpathMatchAll = "//xaml:Variable";
  }

  /**
   * Return an array of warnings as a result of the style check.
   *
   * @returns {Array} An array of warning strings.
   * @since 1.1.0
   */
  getWarnings() {

    let warnings = [];

    // Check the variables for default values.
    if ( this.lenientMatches.length > 0 ) {
      this.lenientMatches.forEach( function( element ) {
        if ( element.hasAttribute( "Default" ) === true ) {
          warnings.push(
            util.format(
              "The variable with name '%s' has a default value. Check to ensure the value is appropriate.",
              element.getAttribute( "Name" )
            )
          );
        }
      } );
    }

    return warnings;
  }
}
