import { BaseStyleRule } from "./BaseStyleRule.js";

/**
 * Class to implement the rule that requires all main flow charts to have annotations.
 *
 */
export class MainFlowchartsHaveAnnotations extends BaseStyleRule {

  /**
   * Construct a new MainFlowchartsHaveAnnotations object.
   *
   * @param {Function} xpath An XPath object with the required namespaces defined.
   * @since 1.0.0
   */
  constructor( xpath ) {
    super( xpath );

    this.xpathMatchAll = "/xaml:Activity/xaml:Flowchart";
    this.xpathMatchSpecific = "/xaml:Activity/xaml:Flowchart[@sap2010:Annotation.AnnotationText and string-length(@sap2010:Annotation.AnnotationText)!=0]";
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
        "Main flowcharts without annotations are not allowed."
      ];
    } else {
      return [];
    }

  }

}
