import { StyleRuleFactory } from "../../app/StyleRuleFactory.js";

import { VariablesMustStartLowerCase } from "../../app/rules/VariablesMustStartLowerCase.js";

import * as assert from "assert";
import * as fs from "fs";

/**
 * Test the VariablesMustStartLowerCase object.
 */
describe( "VariablesMustStartLowerCase", function() {

  /**
   * Test the constructor.
   */
  describe( "#constructor", function() {
    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        new VariablesMustStartLowerCase();
      }, TypeError );
    } );

    it( "should throw an error if the parameter is not a function", function() {
      assert.throws( function() {
        new VariablesMustStartLowerCase( new Object() );
      }, TypeError );
    } );
  } );

  /**
   * Test the checkStyle function.
   */
  describe( "#checkStyleRule", function() {
    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        let styleCheck = new VariablesMustStartLowerCase(
          StyleRuleFactory.getXpathProcessor()
        );

        styleCheck.checkStyleRule();

      }, TypeError );
    } );

    it( "should throw an error if the parameter is not a function", function() {
      assert.throws( function() {
        let styleCheck = new VariablesMustStartLowerCase(
          StyleRuleFactory.getXpathProcessor()
        );

        styleCheck.checkStyleRule(  new Object() );
      }, TypeError );
    } );
  } );

  /**
   * Test getting an array of lenient matching variable nodes from the test file.
   */
  describe( "#getLenientMatches", function() {

    context( "With no XAML processed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new VariablesMustStartLowerCase(
          StyleRuleFactory.getXpathProcessor()
        );

        let matches = styleCheck.getLenientMatches();

        assert.ok( Array.isArray( matches ) );
        assert.strictEqual( matches.length, 0 );

      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an array with four matching nodes", function() {
        let styleCheck = new VariablesMustStartLowerCase(
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
        let styleCheck = new VariablesMustStartLowerCase(
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
        let styleCheck = new VariablesMustStartLowerCase(
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
   * Test getting an array of strict matching variable nodes from the test file.
   */
  describe( "#getStrictMatches", function() {

    context( "With no XAML processed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new VariablesMustStartLowerCase(
          StyleRuleFactory.getXpathProcessor()
        );

        let matches = styleCheck.getStrictMatches();

        assert.ok( Array.isArray( matches ) );
        assert.strictEqual( matches.length, 0 );

      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an empty array", function() {
        let styleCheck = new VariablesMustStartLowerCase(
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
        let styleCheck = new VariablesMustStartLowerCase(
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
        let styleCheck = new VariablesMustStartLowerCase(
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
        let styleCheck = new VariablesMustStartLowerCase(
          StyleRuleFactory.getXpathProcessor()
        );

        let warnings = styleCheck.getWarnings();

        assert.ok( Array.isArray( warnings ) );
        assert.strictEqual( warnings.length, 0 );
      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an empty array", function() {
        let styleCheck = new VariablesMustStartLowerCase(
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
        let styleCheck = new VariablesMustStartLowerCase(
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
        let styleCheck = new VariablesMustStartLowerCase(
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
   *  Test getting an array of errors.
   */
  describe( "#getErrors", function() {

    context( "With no XAML processed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new VariablesMustStartLowerCase(
          StyleRuleFactory.getXpathProcessor()
        );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.strictEqual( errors.length, 0 );
      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an empty array", function() {
        let styleCheck = new VariablesMustStartLowerCase(
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
        let styleCheck = new VariablesMustStartLowerCase(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/dos.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.strictEqual( errors.length, 4 );

        errors = errors.join();

        assert.ok( errors.includes( "Eins" ) );
        assert.ok( errors.includes( "Zwei" ) );
        assert.ok( errors.includes( "Drei" ) );
        assert.ok( errors.includes( "Vier" ) );

      } );
    } );

    context( "With partially valid XAML to process", function() {
      it( "should return an array with three elements", function() {
        let styleCheck = new VariablesMustStartLowerCase(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/tre.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.strictEqual( errors.length, 3 );

        errors = errors.join();

        assert.ok( errors.includes( "Zwei" ) );
        assert.ok( errors.includes( "Drei" ) );
        assert.ok( errors.includes( "Vier" ) );

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
          let styleCheck = new VariablesMustStartLowerCase(
            StyleRuleFactory.getXpathProcessor()
          );

          styleCheck.isFirstCharLowerCase();

        }, TypeError );
      } );

      it( "should throw an error if the parameter is not a function", function() {
        assert.throws( function() {
          let styleCheck = new VariablesMustStartLowerCase(
            StyleRuleFactory.getXpathProcessor()
          );

          styleCheck.isFirstCharLowerCase(  new Object() );
        }, TypeError );
      } );
    } );

    context( "With a valid string supplied", function() {

      it( "should return true if the string starts with a lower case letter", function() {
        let styleCheck = new VariablesMustStartLowerCase(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok(
          styleCheck.isFirstCharLowerCase(  "thisIsValid" )
        );
      } );
    } );

    context( "With an invalid string supplied", function() {
      it( "should return false if the string starts with a lower case letter", function() {
        let styleCheck = new VariablesMustStartLowerCase(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok(
          styleCheck.isFirstCharLowerCase(  "ThisIsInValid" ) === false
        );
      } );
    } );
  } );

} );
