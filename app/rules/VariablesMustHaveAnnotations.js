// Required modules.
import { DOMParser as dom } from "xmldom";

/**
 * Class to implement the rule that requires all variables to have annotations.
 *
 */
export class VariablesMustHaveAnnotations {

  /**
   * Construct a new VariablesMustHaveAnnotations object.
   *
   * @param {Function} xpath An XPath object with the required namespaces defined.
   * @since 1.0.0
   */
  constructor( xpath ) {
    if ( !xpath || typeof xpath !== "function" ) {
      throw new TypeError( "xpath parameter is required and must be a function" );
    }
    this.xpath = xpath;

    this.xpathMatchAll = "//xaml:Variable";
    this.xpathMatchSpecific = "//xaml:Variable[@sap2010:Annotation.AnnotationText and string-length(@sap2010:Annotation.AnnotationText)!=0]";

    this.lenientMatches = [];
    this.strictMatches = [];
  }

  /**
   * Check the supplied xaml against the style rules.
   *
   * @param {string} xaml The xml from a XAML file.
   * @throws {TypeError} Parameter xaml is required and must be a string.
   * @since 1.0.0
   */
  checkStyleRule( xaml ) {

    if ( !xaml || typeof xaml !== "string" ) {
      throw new TypeError( "xaml parameter is required and must be a string" );
    }

    // Parse the XML into a document for processing.
    const doc = new dom().parseFromString( xaml );

    // Execute the XPath query/
    this.lenientMatches = this.xpath( this.xpathMatchAll, doc );
    this.strictMatches = this.xpath( this.xpathMatchSpecific, doc );
  }

  /**
   * Return an array of nodes that matched the lenient xpath expression.
   *
   * @returns {Array} An array of nodes.
   * @since 1.0.0
   */
  getLenientMatches() {
    return this.lenientMatches;
  }

  /**
   * Return an array of nodes that matched the specific xpath expression.
   *
   * @returns {Array} An array of nodes.
   * @since 1.0.0
   */
  getStrictMatches() {
    return this.strictMatches;
  }

  /**
   * Return an array of warnings as a result of the style check.
   *
   * @returns {Array} An array of warning strings.
   * @since 1.0.0
   */
  getWarnings() {
    return [];
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
        "Variables without annotations are not allowed."
      ];
    } else {
      return [];
    }

  }

}
