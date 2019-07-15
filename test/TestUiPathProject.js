const UiPathProject = require( "../app/UiPathProject.js" ).UiPathProject;

const assert = require( "assert" );

/**
 * Test the class that makes it easier to get information about a UiPath project.
 */
describe( "UiPathProject", function() {

  /**
   * Test constructing a new instance of the class.
   */
   describe( "#constructor", function() {
    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        new UiPathProject();
      }, TypeError );
    } );

    it( "should throw an error if the parameter is not a string", function() {
      assert.throws( function() {
        new UiPathProject( new Object );
      }, TypeError );
    } );

    it( "should return an object when a project.json file can be found in the given path", function() {
      let projectInfo = new UiPathProject( "./test/artefacts" );
      assert.equal( typeof projectInfo, "object" );
    } );

    it( "should throw an error if the project.json file cannot be read", function() {
      assert.throws( function() {
        new UiPathProject( "./test" );
      }, Error );
    } );
   } );

} );
