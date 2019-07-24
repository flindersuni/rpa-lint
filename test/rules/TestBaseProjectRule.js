import { BaseProjectRule } from "../../app/rules/BaseProjectRule.js";
import { UiPathProject } from "../../app/UiPathProject.js";

import * as assert from "assert";

/**
 * Test the base project rule class that all other project based style rules extend.
 */
describe( "BaseProjectRule", function() {

  /**
   * Test the constructor.
   */
  describe( "#constructor", function() {
    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        new BaseProjectRule();
      }, TypeError );
    } );

    it( "should throw an error if the parameter is not a UiPathProject object", function() {
      assert.throws( function() {
        new BaseProjectRule( new Object() );
      }, TypeError );
    } );

    it( "should not throw an error when the parameter is a UiPathProject object", function() {
      let projectInfo = new UiPathProject( "./test/artefacts" );

      assert.doesNotThrow( function() {
        new BaseProjectRule( projectInfo );
      }, TypeError );
    } );
  } );

  /**
   *  Test getting an array of warnings.
   */
  describe( "#getWarnings", function() {

    context( "With no style rule applied", function() {
      it( "should return an empty array", function() {
        let projectInfo = new UiPathProject( "./test/artefacts" );

        let styleCheck = new BaseProjectRule( projectInfo );

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

    context( "With no style rule applied", function() {
      it( "should return an empty array", function() {
        let projectInfo = new UiPathProject( "./test/artefacts" );

        let styleCheck = new BaseProjectRule( projectInfo );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.strictEqual( errors.length, 0 );
      } );
    } );
  } );

  /**
   * Test having the checkStyleRule function defined.
   */
  describe( "#checkStyleRule", function() {
    context( "By default", function() {
      it( "should have the checkStyleRule function defined", function() {
        let projectInfo = new UiPathProject( "./test/artefacts" );

        let styleCheck = new BaseProjectRule( projectInfo );

        assert.ok( typeof( styleCheck.checkStyleRule ) === "function" );

        assert.throws( function() {
          styleCheck.checkStyleRule();
        }, Error );

      } );
    } );
  } );
} );
