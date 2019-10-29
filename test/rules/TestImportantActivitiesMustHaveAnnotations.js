import { ImportantActivitiesMustHaveAnnotations } from "../../app/rules/ImportantActivitiesMustHaveAnnotations.js";
import { StyleRuleFactory } from "../../app/StyleRuleFactory.js";

import * as assert from "assert";
import * as fs from "fs";

// Declare a constant here for ease of maintenance.
const expectedErrorCount = 2;

/**
 * Test the BaseStyleRule object.
 */
describe( "BaseStyleRule", function() {

  /**
   * Test the constructor.
   */
  describe( "#constructor", function() {
    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        new ImportantActivitiesMustHaveAnnotations();
      }, TypeError );
    } );

    it( "should throw an error if the parameter is not a function", function() {
      assert.throws( function() {
        new ImportantActivitiesMustHaveAnnotations( new Object() );
      }, TypeError );
    } );
  } );

   /**
    * Test the checkStyle function.
    */
  describe( "#checkStyleRule", function() {
    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        let styleCheck = new ImportantActivitiesMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        styleCheck.checkStyleRule();

      }, TypeError );
    } );

    it( "should throw an error if the parameter is not a function", function() {
      assert.throws( function() {
        let styleCheck = new ImportantActivitiesMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        styleCheck.checkStyleRule(  new Object() );
      }, TypeError );
    } );

    it( "should not throw any errors when processing a file", function() {
      assert.doesNotThrow( function() {
        let styleCheck = new ImportantActivitiesMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/ImportantActivities.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );
      }, Error );
    } );
  } );

  /**
   * Test getting an array of lenient matching Property nodes from the test file.
   */
  describe( "#getLenientMatches", function() {
    context( "With no XAML processed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new ImportantActivitiesMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let matches = styleCheck.getLenientMatches();

        assert.ok( Array.isArray( matches ) );
        assert.strictEqual( matches.length, 0 );

      } );
    } );

    context( "With XAML proccessed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new ImportantActivitiesMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/ImportantActivities.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let matches = styleCheck.getLenientMatches();

        assert.ok( Array.isArray( matches ) );
        assert.strictEqual( matches.length, 0 );

      } );
    } );
  } );

   /**
    * Test getting an array of strict matching Property nodes from the test file.
    */
  describe( "#getStrictMatches", function() {
    context( "With no XAML processed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new ImportantActivitiesMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let matches = styleCheck.getStrictMatches();

        assert.ok( Array.isArray( matches ) );
        assert.strictEqual( matches.length, 0 );

      } );
    } );

    context( "With XAML proccessed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new ImportantActivitiesMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/ImportantActivities.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let matches = styleCheck.getStrictMatches();

        assert.ok( Array.isArray( matches ) );
        assert.strictEqual( matches.length, 0 );

      } );
    } );
  } );

  /**
   *  Test getting an array of warnings.
   */
  describe( "#getWarnings", function() {

    context( "With no XAML processed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new ImportantActivitiesMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let warnings = styleCheck.getWarnings();

        assert.ok( Array.isArray( warnings ) );
        assert.strictEqual( warnings.length, 0 );
      } );
    } );

    context( "With XAML proccessed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new ImportantActivitiesMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/ImportantActivities.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let warnings = styleCheck.getWarnings();

        assert.ok( Array.isArray( warnings ) );
        assert.strictEqual( warnings.length, 0 );

      } );
    } );
  } );

  /**
   *  Test getting an array of warnings.
   */
  describe( "#getErrors", function() {

    context( "With no XAML processed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new ImportantActivitiesMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.strictEqual( errors.length, 0 );
      } );
    } );

    context( "With XAML proccessed", function() {
      it( "should return a non zero length array", function() {
        let styleCheck = new ImportantActivitiesMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/ImportantActivities.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.ok( errors.length > 0 );

      } );

      it( "should return an array with the right number of elements", function() {
        let styleCheck = new ImportantActivitiesMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/ImportantActivities.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.ok( errors.length === expectedErrorCount );

      } );
    } );
  } );
} );
