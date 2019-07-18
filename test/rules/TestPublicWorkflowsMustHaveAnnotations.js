import { StyleRuleFactory } from "../../app/StyleRuleFactory.js";

import { PublicWorkflowsMustHaveAnnotations } from "../../app/rules/PublicWorkflowsMustHaveAnnotations.js";

import * as assert from "assert";
import * as fs from "fs";

/**
 * Test the class that requires public workflows to have annotations.
 */
describe( "PublicWorkflowsMustHaveAnnotations", function() {

  /**
   * Test the constructor.
   */
  describe( "#constructor", function() {
    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        new PublicWorkflowsMustHaveAnnotations();
      }, TypeError );
    } );

    it( "should throw an error if the parameter is not a function", function() {
      assert.throws( function() {
        new PublicWorkflowsMustHaveAnnotations( new Object() );
      }, TypeError );
    } );
  } );

  /**
   * Test the checkStyle function.
   */
  describe( "#checkStyleRule", function() {
    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        let styleCheck = new PublicWorkflowsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        styleCheck.checkStyleRule();

      }, TypeError );
    } );

    it( "should throw an error if the parameter is not a function", function() {
      assert.throws( function() {
        let styleCheck = new PublicWorkflowsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        styleCheck.checkStyleRule(  new Object() );
      }, TypeError );
    } );
  } );

  /**
   * Test getting an array of lenient matching Property nodes from the test file.
   */
  describe( "#getLenientMatches", function() {

    context( "With no XAML processed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new PublicWorkflowsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let matches = styleCheck.getLenientMatches();

        assert.ok( Array.isArray( matches ) );
        assert.strictEqual( matches.length, 0 );

      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an empty array", function() {
        let styleCheck = new PublicWorkflowsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getLenientMatches() ) );

        let xamlContent = fs.readFileSync( "./test/artefacts/uno.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let lenientMatches = styleCheck.getLenientMatches();

        assert.ok( Array.isArray( lenientMatches ) );
        assert.strictEqual( lenientMatches.length, 0 );

      } );
    } );

    context( "With invalid XAML to process", function() {
      it( "should return an empty array", function() {
        let styleCheck = new PublicWorkflowsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getLenientMatches() ) );

        let xamlContent = fs.readFileSync( "./test/artefacts/dos.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let lenientMatches = styleCheck.getLenientMatches();

        assert.ok( Array.isArray( lenientMatches ) );
        assert.strictEqual( lenientMatches.length, 0 );

      } );
    } );
  } );

  /**
   * Test getting an array of lenient matching Property nodes from the test file.
   */
  describe( "#getStrictMatches", function() {

    context( "With no XAML processed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new PublicWorkflowsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let matches = styleCheck.getStrictMatches();

        assert.ok( Array.isArray( matches ) );
        assert.strictEqual( matches.length, 0 );

      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an array with one matching node", function() {
        let styleCheck = new PublicWorkflowsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getStrictMatches() ) );

        let xamlContent = fs.readFileSync( "./test/artefacts/uno.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let strictMatches = styleCheck.getStrictMatches();

        assert.ok( Array.isArray( strictMatches ) );
        assert.strictEqual( strictMatches.length, 1 );

      } );
    } );

    context( "With invalid XAML to process", function() {
      it( "should return an array with zero matching nodes", function() {
        let styleCheck = new PublicWorkflowsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getStrictMatches() ) );

        let xamlContent = fs.readFileSync( "./test/artefacts/dos.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let strictMatches = styleCheck.getStrictMatches();

        assert.ok( Array.isArray( strictMatches ) );
        assert.strictEqual( strictMatches.length, 0 );

      } );
    } );
  } );

  /**
   *  Test getting an array of warnings.
   */
  describe( "#getWarnings", function() {

    context( "With no XAML processed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new PublicWorkflowsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let warnings = styleCheck.getWarnings();

        assert.ok( Array.isArray( warnings ) );
        assert.strictEqual( warnings.length, 0 );
      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an empty array", function() {
        let styleCheck = new PublicWorkflowsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/uno.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let warnings = styleCheck.getWarnings();

        assert.ok( Array.isArray( warnings ) );
        assert.strictEqual( warnings.length, 0 );

      } );
    } );

    context( "With invalid XAML to process", function() {
      it( "should return an empty array", function() {
        let styleCheck = new PublicWorkflowsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/dos.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let warnings = styleCheck.getWarnings();

        assert.ok( Array.isArray( warnings ) );
        assert.strictEqual( warnings.length, 0 );

      } );
    } );
  } );

  /**
   *  Test getting an array of errors.
   */
  describe( "#getErrors", function() {

    context( "With no XAML processed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new PublicWorkflowsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.strictEqual( errors.length, 1 );
      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an empty array", function() {
        let styleCheck = new PublicWorkflowsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/uno.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.strictEqual( errors.length, 0 );

      } );
    } );

    context( "With invalid XAML to process", function() {
      it( "should return an array with one element", function() {
        let styleCheck = new PublicWorkflowsMustHaveAnnotations(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/dos.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.strictEqual( errors.length, 1 );

      } );
    } );
  } );
} );
