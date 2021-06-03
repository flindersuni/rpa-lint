import { BaseStyleRule } from "./BaseStyleRule.js";

import { DOMParser as dom } from "xmldom";
import * as util from "util";
import * as xpath from "xpath";

export class WorkflowsShouldNotContainCodeActivities extends BaseStyleRule {

  /**
   * Construct a new object.
   *
   * @classdesc Implement the rule that prohibits the use of activities that allow the use of code. This includes the list of activities below.
   * [InvokeCode](https://activities.uipath.com/docs/invoke-code).
   * [InvokeComMethod](https://activities.uipath.com/docs/invoke-com-method).
   * [InvokeMethod](https://docs.microsoft.com/en-us/dotnet/api/system.activities.statements.invokemethod?redirectedfrom=MSDN&view=netframework-4.8).
   * [InvokePowerShell](https://activities.uipath.com/docs/invoke-power-shell).
   * This is important because UiPath automations are intended to be low code. The use of these activities is discouraged as they can
   * significantly increase the complexity of an automation. Especially in ways which are not obvious by hiding code.
   * There are times when the use of these activities may be unavoidable. For this reason this rule raises warnings and not errors.
   * @augments BaseStyleRule
   * @constructs
   * @param {xpath} xpath An XPath object with the required namespaces defined.
   * @since 1.0.0
   */
  constructor( xpath ) {
    super( xpath );

    this.xpathMatchesSpecific = new Map(
      [
        [ "InvokeCode", "/xaml:Activity//ui:InvokeCode" ],
        [ "InvokeComMethod", "/xaml:Activity//ui:InvokeComMethod" ],
        [ "InvokeMethod", "/xaml:Activity//xaml:InvokeMethod" ],
        [ "InvokePowerShell", "/xaml:Activity//ui:InvokePowerShell" ]
      ]
    );
  }

  /**
   * Check the supplied xaml against the style rules.
   *
   * @param {string} xaml The xml from a XAML file.
   * @throws {TypeError} Parameter xaml is required and must be a string.
   * @since 1.0.0
   */
  checkStyleRule( xaml ) {

    if ( !xaml || typeof( xaml ) !== "string" ) {
      throw new TypeError( "xaml parameter is required and must be a string" );
    }

    // Reset the list of matches and warnings.
    this.strictMatches = [];
    this.warnings = [];

    // Parse the XML into a document for processing.
    const doc = new dom().parseFromString( xaml );

    // Maintain a reference to the outer object instance.
    const self = this;

    // Execute the XPath queries.
    this.xpathMatchesSpecific.forEach( function( value, key ) {
      let matches = self.xpath( value, doc );

      if ( matches.length > 0 ) {
        self.warnings.push(
          util.format( "%s activities should not be used unless absolutely necessary.", key )
        );

        self.strictMatches = self.strictMatches.concat( matches );
      }

    } );
  }

  /**
   * Return an array of warnings as a result of the style check.
   *
   * @returns {Array} An array of warning strings.
   * @since 1.0.0
   */
  getWarnings() {
    return this.warnings;
  }
}
