// Required modules.
const dom = require( "xmldom" ).DOMParser;

/**
 * Class to implement the rule that requires all arguments to have annotations.
 *
 */
class ArgumentsMustHaveAnnotations {

  /**
   * Construct a new ArgumentsMustHaveAnnotations object.
   *
   * @param {Function} xpath An XPath object with the required namespaces defined.
   * @since 1.0.0
   */
  constructor( xpath ) {
    this.xpath = xpath;

    this.xpathMatchAll = "//xaml:Activity/x:Members/x:Property";
    this.xpathMatchSpecific = "//xaml:Activity/x:Members/x:Property[@sap2010:Annotation.AnnotationText and string-length(@sap2010:Annotation.AnnotationText)!=0]";

    this.lenientMatches = [];
    this.strictMatches = [];
  }

  /**
   * Check the supplied xaml against the style rules.
   *
   * @param {string} xaml The xml from a XAML file.
   * @throws {TypeError} Parameter xaml is required and must be a string.
   */
  checkStyleRule( xaml ) {
    if ( !xaml || !typeof xaml === "string" ) {
      throw new TypeError( "xaml parameter is required and must be a string" );
    }

    // Parse the XML into a document for processing.
    const doc = new dom().parseFromString( xaml );

    // Execute the XPath query/
    this.lenientMatches = this.xpath( this.xpathMatchAll, doc );
    this.strictMatches = this.xpath( this.xpathMatchSpecific, doc );
  }

  /**
   * Returns an array of nodes that matched the lenient xpath expression.
   *
   * @returns {Array} An array of nodes.
   * @since 1.0.0
   */
  getLenientMatches() {
    return this.lenientMatches;
  }

  /**
   * Returns an array of nodes that matched the specific xpath expression.
   *
   * @returns {Array} An array of nodes.
   * @since 1.0.0
   */
  getStrictMatches() {
    return this.strictMatches;
  }

}

exports.ArgumentsMustHaveAnnotations = ArgumentsMustHaveAnnotations;
