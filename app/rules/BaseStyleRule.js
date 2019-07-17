import { DOMParser as dom } from "xmldom";

/**
 * Base class for all style rules.
 */

 export class BaseStyleRule {

  /**
   * Construct a new ArgumentsMustHaveAnnotations object.
   *
   * @param {Function} xpath An XPath object with the required namespaces defined.
   * @since 1.0.0
   */
  constructor( xpath ) {
    if ( !xpath || typeof xpath !== "function" ) {
      throw new TypeError( "xpath parameter is required and must be a function" );
    }
    this.xpath = xpath;

    this.xpathMatchAll = null;
    this.xpathMatchSpecific = null;

    this.lenientMatches = [];
    this.strictMatches = [];

    this.warnings = [];
    this.errors = [];
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

    // Execute the XPath query.
    if ( this.xpathMatchAll !== null ) {
      this.lenientMatches = this.xpath( this.xpathMatchAll, doc );
    }
    if ( this.xpathMatchSpecific !== null ) {
      this.strictMatches = this.xpath( this.xpathMatchSpecific, doc );
    }
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
    return this.warnings;
  }

  /**
   * Return an array of errors as a result of the style check.
   *
   * @returns {Array} An array of error strings.
   * @since 1.0.0
   */
  getErrors() {
    return this.errors;
  }

 }
