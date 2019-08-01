import { BaseStyleRule } from "./BaseStyleRule.js";

import * as util from "util";
import * as xpath from "xpath";

export class ArgumentsMustHaveAnnotations extends BaseStyleRule {

  /**
   * Construct a new object.
   *
   * @classdesc Implement the rule that all arguments must have annotations.
   *
   * This is important as it makes it easier for others to tell what an argument is used for.
   * Without needing to take a deep dive into the code.
   *
   * @augments BaseStyleRule
   *
   * @constructs
   * @param {xpath} xpath An XPath object with the required namespaces defined.
   * @since 1.0.0
   */
  constructor( xpath ) {
    super( xpath );

    this.xpathMatchAll = "/xaml:Activity/x:Members/x:Property";
    this.xpathMatchSpecific = "/xaml:Activity/x:Members/x:Property[@sap2010:Annotation.AnnotationText and string-length(@sap2010:Annotation.AnnotationText)!=0]";
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
    if ( ( this.lenientMatches.length - this.strictMatches.length ) > 0 ) {
      let lenientArguments = this.getAttributeValues( "Name", this.lenientMatches );
      let strictArguments = this.getAttributeValues( "Name", this.strictMatches );

      let errorArguments = this.filterArray( lenientArguments, strictArguments );

      errorArguments.forEach( function( name ) {
        errors.push(
          util.format( "The argument with name '%s' must have an annotation.", name )
        );
      } );
    }

    return errors;

  }

}
