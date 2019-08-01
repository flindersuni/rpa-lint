import { StyleRuleFactory } from "../../app/StyleRuleFactory.js";

import { ArgumentsMustStartUpperCase } from "../../app/rules/ArgumentsMustStartUpperCase.js";

import * as assert from "assert";
import * as fs from "fs";

/**
 * Test the ArgumentsMustStartUpperCase object.
 */
describe( "ArgumentsMustStartUpperCase", function() {

  /**
   * Test the constructor.
   */
  describe( "#constructor", function() {
    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        new ArgumentsMustStartUpperCase();
      }, TypeError );
    } );

    it( "should throw an error if the parameter is not a function", function() {
      assert.throws( function() {
        new ArgumentsMustStartUpperCase( new Object() );
      }, TypeError );
    } );
  } );

  /**
   * Test the checkStyle function.
   */
  describe( "#checkStyleRule", function() {
    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        let styleCheck = new ArgumentsMustStartUpperCase(
          StyleRuleFactory.getXpathProcessor()
        );

        styleCheck.checkStyleRule();

      }, TypeError );
    } );

    it( "should throw an error if the parameter is not a function", function() {
      assert.throws( function() {
        let styleCheck = new ArgumentsMustStartUpperCase(
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
        let styleCheck = new ArgumentsMustStartUpperCase(
          StyleRuleFactory.getXpathProcessor()
        );

        let matches = styleCheck.getLenientMatches();

        assert.ok( Array.isArray( matches ) );
        assert.strictEqual( matches.length, 0 );

      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an array with four matching nodes", function() {
        let styleCheck = new ArgumentsMustStartUpperCase(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getLenientMatches() ) );

        let xamlContent = fs.readFileSync( "./test/artefacts/uno.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let lenientMatches = styleCheck.getLenientMatches();

        assert.ok( Array.isArray( lenientMatches ) );
        assert.strictEqual( lenientMatches.length, 4 );

      } );
    } );

    context( "With invalid XAML to process", function() {
      it( "should return an array with four matching nodes", function() {
        let styleCheck = new ArgumentsMustStartUpperCase(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getLenientMatches() ) );

        let xamlContent = fs.readFileSync( "./test/artefacts/dos.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let lenientMatches = styleCheck.getLenientMatches();

        assert.ok( Array.isArray( lenientMatches ) );
        assert.strictEqual( lenientMatches.length, 4 );

      } );
    } );

    context( "With partially valid XAML to process", function() {
      it( "should return an array with four matching nodes", function() {
        let styleCheck = new ArgumentsMustStartUpperCase(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getLenientMatches() ) );

        let xamlContent = fs.readFileSync( "./test/artefacts/tre.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let lenientMatches = styleCheck.getLenientMatches();

        assert.ok( Array.isArray( lenientMatches ) );
        assert.strictEqual( lenientMatches.length, 4 );

      } );
    } );
  } );

  /**
   * Test getting an array of strict matching nodes from the test file.
   */
  describe( "#getStrictMatches", function() {

    context( "With no XAML processed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new ArgumentsMustStartUpperCase(
          StyleRuleFactory.getXpathProcessor()
        );

        let matches = styleCheck.getStrictMatches();

        assert.ok( Array.isArray( matches ) );
        assert.strictEqual( matches.length, 0 );

      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an empty array", function() {
        let styleCheck = new ArgumentsMustStartUpperCase(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getStrictMatches() ) );

        let xamlContent = fs.readFileSync( "./test/artefacts/uno.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let matches = styleCheck.getStrictMatches();

        assert.ok( Array.isArray( matches ) );
        assert.strictEqual( matches.length, 0 );

      } );
    } );

    context( "With invalid XAML to process", function() {
      it( "should return an empty array", function() {
        let styleCheck = new ArgumentsMustStartUpperCase(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getStrictMatches() ) );

        let xamlContent = fs.readFileSync( "./test/artefacts/dos.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let matches = styleCheck.getStrictMatches();

        assert.ok( Array.isArray( matches ) );
        assert.strictEqual( matches.length, 0 );

      } );
    } );

    context( "With partially valid XAML to process", function() {
      it( "should return an empty array", function() {
        let styleCheck = new ArgumentsMustStartUpperCase(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getStrictMatches() ) );

        let xamlContent = fs.readFileSync( "./test/artefacts/tre.xaml" );
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
        let styleCheck = new ArgumentsMustStartUpperCase(
          StyleRuleFactory.getXpathProcessor()
        );

        let warnings = styleCheck.getWarnings();

        assert.ok( Array.isArray( warnings ) );
        assert.strictEqual( warnings.length, 0 );
      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an empty array", function() {
        let styleCheck = new ArgumentsMustStartUpperCase(
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
        let styleCheck = new ArgumentsMustStartUpperCase(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/dos.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let warnings = styleCheck.getWarnings();

        assert.ok( Array.isArray( warnings ) );
        assert.strictEqual( warnings.length, 0 );

      } );
    } );

    context( "With partially valid XAML to process", function() {
      it( "should return an empty array", function() {
        let styleCheck = new ArgumentsMustStartUpperCase(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/tre.xaml" );
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
        let styleCheck = new ArgumentsMustStartUpperCase(
          StyleRuleFactory.getXpathProcessor()
        );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.strictEqual( errors.length, 0 );
      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an empty array", function() {
        let styleCheck = new ArgumentsMustStartUpperCase(
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
      it( "should return an array with four elements", function() {
        let styleCheck = new ArgumentsMustStartUpperCase(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/dos.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.strictEqual( errors.length, 4 );

        errors = errors.join();

        assert.ok( errors.includes( "ichi" ) );
        assert.ok( errors.includes( "ni" ) );
        assert.ok( errors.includes( "san" ) );
        assert.ok( errors.includes( "shi" ) );

      } );
    } );

    context( "With partially valid XAML to process", function() {
      it( "should return an array with one element", function() {
        let styleCheck = new ArgumentsMustStartUpperCase(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/tre.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.strictEqual( errors.length, 2 );

        errors = errors.join();

        assert.ok( errors.includes( "san" ) );
        assert.ok( errors.includes( "shi" ) );

      } );
    } );
  } );

  /**
   * Test checking the first character of a string.
   */
  describe( "#isFirstCharLowerCase", function() {

    context( "With no parameter supplied", function() {
      it( "should throw an error if the parameter is not supplied", function() {
        assert.throws( function() {
          let styleCheck = new ArgumentsMustStartUpperCase(
            StyleRuleFactory.getXpathProcessor()
          );

          styleCheck.isFirstCharUpperCase();

        }, TypeError );
      } );

      it( "should throw an error if the parameter is not a function", function() {
        assert.throws( function() {
          let styleCheck = new ArgumentsMustStartUpperCase(
            StyleRuleFactory.getXpathProcessor()
          );

          styleCheck.isFirstCharUpperCase(  new Object() );
        }, TypeError );
      } );
    } );

    context( "With a valid string supplied", function() {

      it( "should return true if the string starts with a lower case letter", function() {
        let styleCheck = new ArgumentsMustStartUpperCase(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok(
          styleCheck.isFirstCharUpperCase(  "ThisIsValid" )
        );
      } );
    } );

    context( "With an invalid string supplied", function() {
      it( "should return false if the string starts with a lower case letter", function() {
        let styleCheck = new ArgumentsMustStartUpperCase(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok(
          styleCheck.isFirstCharUpperCase(  "thisIsInValid" ) === false
        );
      } );
    } );
  } );
} );
