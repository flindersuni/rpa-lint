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
    assert.equal( typeof( projectInfo ), "object" );
  } );

  it( "should throw an error if the project.json file cannot be read", function() {
    assert.throws( function() {
      new UiPathProject( "./test" );
    }, Error );
  } );
} );

  /**
   * Test getting the name of the UiPath project.
   */
  describe( "#getName", function() {
    it( "should return a string", function() {
      let projectInfo = new UiPathProject( "./test/artefacts" );
      assert.equal( typeof( projectInfo.getName() ), "string" );
    } );

    it( "should return a name that matches what is in the JSON file", function() {
      let projectInfo = new UiPathProject( "./test/artefacts" );
      assert.equal( projectInfo.getName(), "Flinders.Foundation" );
    } );

    it( "should return an empty string when name property is missing", function() {
      let projectInfo = new UiPathProject( "./test/artefacts" );
      projectInfo.fileContents = {};
      assert.equal( projectInfo.getName(), "" );
    } );
  } );

  /**
   * Test getting the description of the UiPath project.
   */
  describe( "#getDescription", function() {
    it( "should return a string", function() {
      let projectInfo = new UiPathProject( "./test/artefacts" );
      assert.equal( typeof( projectInfo.getDescription() ), "string" );
    } );

    it( "should return a description that matches what is in the JSON file", function() {
      let projectInfo = new UiPathProject( "./test/artefacts" );
      assert.equal( projectInfo.getDescription(), "The Flinders.Foundation library contains foundational workflows for use across all processes" );
    } );

    it( "should return an empty string when description property is missing", function() {
      let projectInfo = new UiPathProject( "./test/artefacts" );
      projectInfo.fileContents = {};
      assert.equal( projectInfo.getDescription(), "" );
    } );
  } );

  /**
   * Test getting the version of the UiPath project.
   */
  describe( "#getVersion", function() {
    it( "should return a string", function() {
      let projectInfo = new UiPathProject( "./test/artefacts" );
      assert.equal( typeof( projectInfo.getVersion() ), "string" );
    } );

    it( "should return a version that matches what is in the JSON file", function() {
      let projectInfo = new UiPathProject( "./test/artefacts" );
      assert.equal( projectInfo.getVersion(), "2.0.0-alpha" );
    } );

    it( "should return an empty string when projectVersion property is missing", function() {
      let projectInfo = new UiPathProject( "./test/artefacts" );
      projectInfo.fileContents = {};
      assert.equal( projectInfo.getVersion(), "" );
    } );
  } );

  /**
   * Test determining if this is a library project or not.
   */
  describe( "#isLibrary", function() {
    it( "should return a boolean", function() {
      let projectInfo = new UiPathProject( "./test/artefacts" );
      assert.equal( typeof( projectInfo.isLibrary() ), "boolean" );
    } );

    it( "should return true if this is a library project", function() {
      let projectInfo = new UiPathProject( "./test/artefacts" );
      assert.equal(  projectInfo.isLibrary(), true );
    } );

    it( "should return false if this is not a library project", function() {
      let projectInfo = new UiPathProject( "./test/artefacts" );
      projectInfo.fileContents.projectType = "Workflow";
      assert.equal( projectInfo.isLibrary(), false );
    } );

    it( "should return false if the projectType property is missing", function() {
      let projectInfo = new UiPathProject( "./test/artefacts" );
      projectInfo.fileContents = {};
      assert.equal( projectInfo.isLibrary(), false );
    } );
  } );
} );
