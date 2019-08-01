import { DOMParser as dom } from "xmldom";
import * as xpath from "xpath";

/**
 * Base class for all style rules.
 */
 export class BaseStyleRule {

  /**
   * Construct a new object.
   *
   * @classdesc Base class for all style rules.
   *
   * @constructs
   *
   * @param {xpath} xpath An XPath object with the required namespaces defined.
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

    if ( !xaml || typeof( xaml ) !== "string" ) {
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

  /**
   * Given a list of Elements find and return the value of the named attribute.
   *
   * @param {string} attributeName The name of attribute to search for.
   * @param {Array} elements The list of attributes to search.
   * @returns {Array} An array of values for the matching attributes.
   * @throws {TypeError} Parameter attributeName is required and must be a string.
   * @throws {TypeError} Parameter elements is required and must be an array.
   * @since 1.0.0
   */
  getAttributeValues( attributeName, elements ) {

    if ( !attributeName || typeof( attributeName ) !== "string" ) {
      throw new TypeError( "attributeName parameter is required and must be a string" );
    }

    if ( !elements || Array.isArray( elements ) === false ) {
      throw new TypeError( "elements parameter is required and must be an array" );
    }

    let values = [];

    elements.forEach( function( element ) {
      if ( element.hasAttribute( attributeName ) === true ) {
        values.push( element.getAttribute( attributeName ) );
      }
    } );

    return values;
  }

  /**
   * Return the list of elements in the search array that do not appear in the criteria array.
   *
   * @param {Array} source An array of elements to search.
   * @param {Array} criteria An array of elements to search for.
   * @returns {Array} An array of values in the search array that are also in the criteria array.
   * @throws {TypeError} Parameter source is required and must be a string.
   * @throws {TypeError} Parameter criteria is required and must be an array.
   * @since 1.0.0
   */
  filterArray( source, criteria ) {

    if ( !source || Array.isArray( source ) === false ) {
      throw new TypeError( "source parameter is required and must be an array" );
    }

    if ( !criteria || Array.isArray( criteria ) === false ) {
      throw new TypeError( "criteria parameter is required and must be an array" );
    }

    // If the criteria array is empty, return the source array un touched.
    if ( criteria.length === 0 ) {
      return source;
    }

    return source.filter( function( item ) {
      return !criteria.includes( item );
    } );
  }

 }
