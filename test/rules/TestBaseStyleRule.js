import { BaseStyleRule } from "../../app/rules/BaseStyleRule.js";
import { StyleRuleFactory } from "../../app/StyleRuleFactory.js";

import * as assert from "assert";
import * as fs from "fs";

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
      it( "should return an array of five attribute values", function() {
        let styleCheck = new BaseStyleRule(
          StyleRuleFactory.getXpathProcessor()
        );

        styleCheck.xpathMatchAll = "//xaml:Variable";

        let xamlContent = fs.readFileSync( "./test/artefacts/dos.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let attributes = styleCheck.getAttributeValues( "Name", styleCheck.lenientMatches );

        assert.ok( Array.isArray( attributes ) );
        assert.strictEqual( attributes.length, 5 );

        attributes = attributes.join();

        assert.ok( attributes.includes( "Eins" ) );
        assert.ok( attributes.includes( "Zwei" ) );
        assert.ok( attributes.includes( "Drei" ) );
        assert.ok( attributes.includes( "Vier" ) );
        assert.ok( attributes.includes( "Ichi" ) );

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

  /**
   * Test parsing a complex annotation.
   */
  describe( "#parseComplexAnnotation", function() {

    let complexAnnotation = "UPTF000001E0eyI8SGVscExpbms+a19fQmFja2luZ0ZpZWxkIjoiaHR0cHM6XC9cL2dpdGh1Yi5jb21cL2ZsaW5kZXJzdW5pXC9ycGEtRmxpbmRlcnMuRm91bmRhdGlvblwvd2lraVwvTG9naW5Ub09rdGFEYXNoYm9hcmQiLCI8SW5pdGlhbFRvb2x0aXA+a19fQmFja2luZ0ZpZWxkIjoiTG9naW4gdG8gRmxpbmRlcnMgRGFzaGJvYXJkIChPa3RhKVx1MDAwYVx1MDAwYVRoaXMgYWN0aXZpdHkgd2lsbCBsb2dpbiB0byB0aGUgRmxpbmRlcnMgRGFzaGJvYXJkIChPa3RhKSB1c2luZyB0aGUgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIHRoYXQgaXMgc3RvcmVkIGluIHRoZSBmb3VuZCBjcmVkZW50aWFsLiIsIjxWZXJzaW9uPmtfX0JhY2tpbmdGaWVsZCI6MX0=";

    context( "With invalid parameters", function() {
      it( "should throw a TypeError", function() {
        let styleCheck = new BaseStyleRule(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.throws( function() {
          styleCheck.parseComplexAnnotation();
        },  TypeError );

        assert.throws( function() {
          styleCheck.parseComplexAnnotation( [] );
        },  TypeError );

        assert.throws( function() {
          styleCheck.parseComplexAnnotation( "encdata" );
        }, {
          name: /^TypeError$/,
          message: /must start with 'UPTF'$/
        } );

        assert.doesNotThrow( function() {
          styleCheck.parseComplexAnnotation( complexAnnotation );
        }, /must start with 'UPTF'$/ );
      } );
    } );

    context( "Wth valid parameters", function() {
      it( "should return a JSON object ", function() {

        let styleCheck = new BaseStyleRule(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.doesNotThrow( function() {
          styleCheck.parseComplexAnnotation( complexAnnotation );
        }, TypeError );

        assert.doesNotThrow( function() {
          styleCheck.parseComplexAnnotation( complexAnnotation );
        }, SyntaxError );

        let decodedObj = styleCheck.parseComplexAnnotation( complexAnnotation );
        assert.strictEqual( typeof decodedObj, "object" );
      } );

      it( "should return a JSON object with three properties", function() {
        let styleCheck = new BaseStyleRule(
          StyleRuleFactory.getXpathProcessor()
        );

        let decodedObj = styleCheck.parseComplexAnnotation( complexAnnotation );

        assert.ok(
          Object.prototype.hasOwnProperty.call( decodedObj, "HelpLink" )
        );

        assert.ok(
          Object.prototype.hasOwnProperty.call( decodedObj, "InitialTooltip" )
        );

        assert.ok(
          Object.prototype.hasOwnProperty.call( decodedObj, "Version" )
        );

        assert.ok( decodedObj.HelpLink.includes(
          "github.com/flindersuni/rpa-Flinders.Foundation/wiki"
        ) );

        assert.ok( decodedObj.InitialTooltip.includes(
          "Login to Flinders Dashboard (Okta)"
        ) );

        assert.strictEqual( decodedObj.Version, 1 );

      } );
    } );
  } );
} );
