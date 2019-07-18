import { BaseStyleRule } from "../app/rules/BaseStyleRule.js";
import { StyleRuleFactory } from "../app/StyleRuleFactory.js";

import * as assert from "assert";
import * as fs from "fs";

/**
 * Test the base style rule class that all other style rules extend.
 */
describe( "BaseStyleRule", function() {

  /**
   * Test the constructor.
   */
  describe( "#constructor", function() {
    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        new BaseStyleRule();
      }, TypeError );
    } );

    it( "should throw an error if the parameter is not a function", function() {
      assert.throws( function() {
        new BaseStyleRule( new Object() );
      }, TypeError );
    } );
  } );

   /**
    * Test the checkStyle function.
    */
  describe( "#checkStyleRule", function() {
    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        let styleCheck = new BaseStyleRule(
          StyleRuleFactory.getXpathProcessor()
        );

        styleCheck.checkStyleRule();

      }, TypeError );
    } );

    it( "should throw an error if the parameter is not a function", function() {
      assert.throws( function() {
        let styleCheck = new BaseStyleRule(
          StyleRuleFactory.getXpathProcessor()
        );

        styleCheck.checkStyleRule(  new Object() );
      }, TypeError );
    } );

    context( "With valid XAML to process", function() {
      it( "should not do anything as XPaths have not been defined", function() {
        let styleCheck = new BaseStyleRule(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getLenientMatches() ) );

        let xamlContent = fs.readFileSync( "./test/artefacts/uno.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let lenientMatches = styleCheck.getLenientMatches();

        assert.ok( Array.isArray( lenientMatches ) );
        assert.strictEqual( lenientMatches.length, 0 );

        let strictMatches = styleCheck.getStrictMatches();

        assert.ok( Array.isArray( strictMatches ) );
        assert.strictEqual( strictMatches.length, 0 );

      } );
    } );
  } );

  /**
   * Test getting an array of lenient matching Property nodes from the test file.
   */
  describe( "#getLenientMatches", function() {
    context( "With no XAML processed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new BaseStyleRule(
          StyleRuleFactory.getXpathProcessor()
        );

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
        let styleCheck = new BaseStyleRule(
          StyleRuleFactory.getXpathProcessor()
        );

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
        let styleCheck = new BaseStyleRule(
          StyleRuleFactory.getXpathProcessor()
        );

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
        let styleCheck = new BaseStyleRule(
          StyleRuleFactory.getXpathProcessor()
        );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.strictEqual( errors.length, 0 );
      } );
    } );
  } );

  // Test getting attribute values.
  describe( "#getAttributeValues", function() {
    context( "With invalid parameters", function() {
      it( "should throw a TypeError", function() {
        let styleCheck = new BaseStyleRule(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.throws( function() {
          styleCheck.getAttributeValues();
        },  TypeError );

        assert.throws( function() {
          styleCheck.getAttributeValues( new Object() );
        },  TypeError );


        assert.throws( function() {
          styleCheck.getAttributeValues( new Object(), [] );
        },  TypeError );

        assert.throws( function() {
          styleCheck.getAttributeValues( " " );
        },  TypeError );

        assert.throws( function() {
          styleCheck.getAttributeValues( " ", new Object() );
        },  TypeError );

      } );
    } );

    context( "With valid parameters and nodes with matching attributes", function() {
      it( "should return an array of attribute values", function() {
        let styleCheck = new BaseStyleRule(
          StyleRuleFactory.getXpathProcessor()
        );

        styleCheck.xpathMatchAll = "//xaml:Variable";

        let xamlContent = fs.readFileSync( "./test/artefacts/dos.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let attributes = styleCheck.getAttributeValues( "Name", styleCheck.lenientMatches );

        assert.ok( Array.isArray( attributes ) );
        assert.strictEqual( attributes.length, 4 );

        attributes = attributes.join();

        assert.ok( attributes.includes( "Eins" ) );
        assert.ok( attributes.includes( "Zwei" ) );
        assert.ok( attributes.includes( "Drei" ) );
        assert.ok( attributes.includes( "Vier" ) );

      } );

      context( "With valid parameters and nodes without matching attributes", function() {
        it( "should return an empty array", function() {
          let styleCheck = new BaseStyleRule(
            StyleRuleFactory.getXpathProcessor()
          );

          styleCheck.xpathMatchAll = "//xaml:Variable";

          let xamlContent = fs.readFileSync( "./test/artefacts/dos.xaml" );
          styleCheck.checkStyleRule( xamlContent.toString() );

          let attributes = styleCheck.getAttributeValues( "NoNames", styleCheck.lenientMatches );

          assert.ok( Array.isArray( attributes ) );
          assert.strictEqual( attributes.length, 0 );
        } );
      } );
    } );
  } );

  /**
   * Test filtering an array.
   */
  describe( "#filterArray", function() {
    context( "With invalid parameters", function() {
      it( "should throw a TypeError", function() {
        let styleCheck = new BaseStyleRule(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.throws( function() {
          styleCheck.filterArray();
        },  TypeError );

        assert.throws( function() {
          styleCheck.filterArray( [] );
        },  TypeError );

        assert.throws( function() {
          styleCheck.filterArray( [], "" );
        },  TypeError );

        assert.throws( function() {
          styleCheck.filterArray( "", [] );
        },  TypeError );
      } );
    } );

    context( "With a search and criteria array", function() {
      it( "should return an array containing elements in both arrays", function() {
        let searchArray = [
          "un",
          "deux",
          "trois",
          "quatre",
          "cinq"
        ];

        let criteriaArray = [
          "un",
          "deux",
          "trois",
          "quatre"
        ];

        let expectedArray = [
          "cinq"
        ];

        let styleCheck = new BaseStyleRule(
          StyleRuleFactory.getXpathProcessor()
        );

        let resultsArray = styleCheck.filterArray( searchArray, criteriaArray );

        assert.ok( Array.isArray( resultsArray ) );
        assert.strictEqual( resultsArray.length, 1 );
        assert.deepStrictEqual( resultsArray, expectedArray );
      } );
    } );
  } );
} );
