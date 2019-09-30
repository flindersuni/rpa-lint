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

    let errors = [];

    // Check to see if errors have been detected.
    if ( this.strictMatches.length === 0 ) {
      return [
        "Public workflows in libraries without annotations are not allowed."
      ];
    } else {

      // Check the content of the annotation.
      try {
        let workflowProperties = this.parseComplexAnnotation(
          this.strictMatches[ 0 ].textContent
        );

        if ( workflowProperties.HelpLink.length === 0 ) {
          errors.push(
            "Public workflows in libraries must have a help link."
          );
        }

        if ( workflowProperties.InitialTooltip.length === 0 ) {
          errors.push(
            "Public workflows in libraries must have a description."
          );
        }

        return errors;

      } catch ( thrownError ) {
        if ( thrownError instanceof TypeError ) {
          return [
            "Value of annotation appears to be invalid."
          ];
        } else if ( thrownError instanceof SyntaxError ) {
          return [
            "Unable to parse the JSON value in the annotation."
          ];
        } else {
          return [
            "An unexpected error occurred processing this annotation."
          ];
        }
      }
    }
  }
}
