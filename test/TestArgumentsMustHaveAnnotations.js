const StyleRuleFactory = require( "../app/StyleRuleFactory.js" ).StyleRuleFactory;

const ArgumentsMustHaveAnnotations = require(
  "../app/ArgumentsMustHaveAnnotations.js"
).ArgumentsMustHaveAnnotations;

const assert = require( "assert" );
const fs = require( "fs" );

/**
 * Test the class that checks the style rule requiring all arguments to have annotations.
 */
describe( "ArgumentsMustHaveAnnotations", function() {

  /**
   * Test getting an array of lenient matching Property nodes from the test file.
   */
  describe( "#getLenientMatches", function() {

    context( "With no XAML processed", function() {
      it( "should return an array", function() {
        let styleCheck = new ArgumentsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getLenientMatches() ) );

      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an array with four matching nodes", function() {
        let styleCheck = new ArgumentsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getLenientMatches() ) );

        let xamlContent = fs.readFileSync( "./test/artefacts/uno.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString(), "uno.xaml" );

        let lenientMatches = styleCheck.getLenientMatches();

        assert.ok( Array.isArray( lenientMatches ) );
        assert.equal( lenientMatches.length, 4 );

      } );
    } );
  } );

  /**
   * Test getting an array of lenient matching Property nodes from the test file.
   */
  describe( "#getStrictMatches", function() {

    context( "With no XAML processed", function() {
      it( "should return an array", function() {
        let styleCheck = new ArgumentsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getStrictMatches() ) );

      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an array with four matching nodes", function() {
        let styleCheck = new ArgumentsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getStrictMatches() ) );

        let xamlContent = fs.readFileSync( "./test/artefacts/uno.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString(), "uno.xaml" );

        let strictMatches = styleCheck.getStrictMatches();

        assert.ok( Array.isArray( strictMatches ) );
        assert.equal( strictMatches.length, 4 );

      } );
    } );
  } );
} );
