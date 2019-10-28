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

    // Maintain a list of variables to always ignore.
    this.ignoreVariableNameList = [
      "defaultDelayValue",
      "validStudyPeriods"
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

        // Get the name of the variable which is always available.
        let variableName = element.getAttribute( "Name" );

        // Make sure this name isn't on the ignore list.
        if ( self.ignoreVariableNameList.includes( variableName ) === false ) {

          if ( element.hasAttribute( "Default" ) === true ) {
            warnings.push(
              util.format(
                "The variable with name '%s' has a default value. Check to ensure the value is appropriate.",
                variableName
              )
            );
          }
        }
      } );
    }

    return warnings;
  }
}
