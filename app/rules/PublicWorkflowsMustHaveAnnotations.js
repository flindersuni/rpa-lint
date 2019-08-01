import { BaseStyleRule } from "./BaseStyleRule.js";

import * as xpath from "xpath";

export class PublicWorkflowsMustHaveAnnotations extends BaseStyleRule {

  /**
   * Construct a new object.
   *
   * @classdesc Implement the rule that public workflows must have an annotation.
   *
   * This is important as the annotation forms the basis for the tooltip displayed in UiPath studio.
   *
   * @augments BaseStyleRule
   *
   * @constructs
   *
   * @param {xpath} xpath An XPath object with the required namespaces defined.
   * @since 1.0.0
   */
  constructor( xpath ) {
    super( xpath );

    this.xpathMatchSpecific = "/xaml:Activity/sap2010:Annotation.AnnotationText[string-length(text())!=0]";
  }

  /**
   * Return an array of errors as a result of the style check.
   *
   * @returns {Array} An array of error strings.
   * @since 1.0.0
   */
  getErrors() {

    // Check to see if errors have been detected.
    if ( this.strictMatches.length === 0 ) {
      return [
        "Public workflows in libraries without annotations are not allowed."
      ];
    } else {
      return [];
    }
  }
}
