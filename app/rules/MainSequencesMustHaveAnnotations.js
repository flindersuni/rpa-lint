import { BaseStyleRule } from "./BaseStyleRule.js";

/**
 * Implement the rule that the main sequence of a workflow must have an annotation.
 *
 * This is important as it documents the workflow, making it easier for others to use.
 *
 * Extends [BaseStyleRule]{@link BaseStyleRule}.
 */
export class MainSequencesMustHaveAnnotations extends BaseStyleRule {

  /**
   * Construct a new MainSequencesMustHaveAnnotations object.
   *
   * @param {Function} xpath An XPath object with the required namespaces defined.
   * @since 1.0.0
   */
  constructor( xpath ) {
    super( xpath );

    this.xpathMatchAll = "/xaml:Activity/xaml:Sequence";
    this.xpathMatchSpecific = "/xaml:Activity/xaml:Sequence[@sap2010:Annotation.AnnotationText and string-length(@sap2010:Annotation.AnnotationText)!=0]";
  }

  /**
   * Return an array of errors as a result of the style check.
   *
   * @returns {Array} An array of error strings.
   * @since 1.0.0
   */
  getErrors() {

    // Check to see if errors have been detected.
    if ( ( this.lenientMatches.length - this.strictMatches.length ) > 0 ) {
      return [
        "Main sequences without annotations are not allowed."
      ];
    } else {
      return [];
    }

  }

}
