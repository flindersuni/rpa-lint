import { BaseStyleRule } from "./BaseStyleRule.js";

/**
 * Class to implement the rule that requires all public workflows to have annotations.
 *
 */
export class PublicWorkflowsMustHaveAnnotations extends BaseStyleRule {

  /**
   * Construct a new VariablesMustHaveAnnotations object.
   *
   * @param {Function} xpath An XPath object with the required namespaces defined.
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
