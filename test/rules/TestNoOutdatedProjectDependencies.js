import { NoOutdatedProjectDependencies } from "../../app/rules/NoOutdatedProjectDependencies.js";
import { UiPathProject } from "../../app/UiPathProject.js";

import * as assert from "assert";

// Use shorter lists of dependencies for checking style rules.
const oneDependency = {
  "Flinders.Foundation.Testing": "1.0.1-alpha.5"
};

const twoDependencies = {
  "Flinders.Foundation.Testing": "1.0.1-alpha.5",
  "UiPath.UIAutomation.Activities": "19.6.0"
};

/**
 * Test the base project rule class that all other project based style rules extend.
 */
describe( "NoOutdatedProjectDependencies", function() {

  /**
   * Test the constructor.
   */
  describe( "#constructor", function() {
    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        new NoOutdatedProjectDependencies();
      }, TypeError );
    } );

    it( "should throw an error if the parameter is not a UiPathProject object", function() {
      assert.throws( function() {
        new NoOutdatedProjectDependencies( new Object() );
      }, TypeError );
    } );

    it( "should not throw an error when the parameter is a UiPathProject object", function() {
      let projectInfo = new UiPathProject( "./test/artefacts" );

      assert.doesNotThrow( function() {
        new NoOutdatedProjectDependencies( projectInfo );
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

        let styleCheck = new NoOutdatedProjectDependencies( projectInfo );

        let warnings = styleCheck.getWarnings();

        assert.ok( Array.isArray( warnings ) );
        assert.strictEqual( warnings.length, 0 );
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

        let styleCheck = new NoOutdatedProjectDependencies( projectInfo );

        assert.ok( typeof( styleCheck.checkStyleRule ) === "function" );

      } );
    } );

    context( "With the test UiPath project.json asset", function() {
      it( "should complete with no errors", function() {
        let projectInfo = new UiPathProject( "./test/artefacts" );

        // Adjust the list of dependencies to increase test performance.
        projectInfo.fileContents.dependencies = oneDependency;

        let styleCheck = new NoOutdatedProjectDependencies( projectInfo );

        assert.doesNotThrow( function() {
          styleCheck.checkStyleRule();
        }, Error );

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

        let styleCheck = new NoOutdatedProjectDependencies( projectInfo );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.strictEqual( errors.length, 0 );
      } );
    } );

    context( "After applying the style rule", function() {
      it( "should return a non empty array", function() {
        this.timeout( 5000 );
        let projectInfo = new UiPathProject( "./test/artefacts" );

        // Adjust the list of dependencies to increase test performance.
        projectInfo.fileContents.dependencies = twoDependencies;

        let styleCheck = new NoOutdatedProjectDependencies( projectInfo );

        styleCheck.checkStyleRule();

        let errors = styleCheck.getErrors();
        assert.ok( Array.isArray( errors ) );
        assert.strictEqual( errors.length, 1 );
      } );
    } );
  } );
} );
