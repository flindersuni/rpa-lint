import { BaseStyleRule } from "./BaseStyleRule.js";

import { StyleRuleFactory } from "../StyleRuleFactory.js";

import { DOMParser as dom } from "xmldom";

import * as util from "util";
import * as xpath from "xpath";

export class ImportantActivitiesMustHaveAnnotations extends BaseStyleRule {

  /**
   * Construct a new object.
   *
   * @classdesc Implement the rule that the main flowchart of a workflow must have an annotation.
   * This is important as it documents the workflow, making it easier for others to use.
   * @augments BaseStyleRule
   * @constructs
   * @param {xpath} xpath An XPath object with the required namespaces defined.
   * @since 1.2.0
   */
  constructor( xpath ) {
    super( xpath );

    this.activityMap = StyleRuleFactory.getTomlData( "ImportantActivities" );
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

    // Reset the list of errors between XAML files.
    this.errors = [];

    // Parse the XML into a document for processing.
    const doc = new dom().parseFromString( xaml );

    let lenientMatches = [];
    let strictMatches = [];
    let matchDifference = 0;

    // Check each of the listed activities.
    for ( var value  of this.activityMap.values() ) {

      lenientMatches = this.xpath( value.lenientMatch, doc );
      strictMatches = this.xpath( value.strictMatch, doc );
      matchDifference = lenientMatches.length - strictMatches.length;

      if ( matchDifference === 1 ) {
        this.errors.push(
          util.format(
            "%s are important and must have annotations. %d does not have an annotation.",
            value.description,
            matchDifference
          )
        );
      } else if ( matchDifference > 1 ) {
        this.errors.push(
          util.format(
            "%s are important and must have annotations. %d do not have annotations.",
            value.description,
            matchDifference
          )
        );
      }
    }
  }
}
