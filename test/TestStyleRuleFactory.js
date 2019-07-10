const StyleRuleFactory = require( "../app/StyleRuleFactory.js" ).StyleRuleFactory;
const assert = require( "assert" );

// Use a constant to make updating this value during development / test cycles easier.
const expectedNamespaceCount = 3;

/**
 * Test the static functions of the StyleRuleFactory class.
 */
describe( "StyleRuleFactory", function() {

  /**
   * Test getting the list of supported XML namespaces.
   */
  describe( "#getXamlNamespaces()", function() {
    it( "should return an object", function() {
      assert.equal( typeof StyleRuleFactory.getXamlNamespaces(), "object" );
    } );

    it( "should return a object with 1 property", function() {
      let obj = StyleRuleFactory.getXamlNamespaces();
      assert.equal( Object.keys( obj ).length, expectedNamespaceCount );
    } );

    it( "should return an object that contains a xaml property", function() {
      let keys = Object.keys( StyleRuleFactory.getXamlNamespaces() );
      assert.ok( keys.includes( "xaml" ), "xaml object property missing" );
    } );

    it( "should return an object that has a xaml property with the correct URI", function() {
      let obj = StyleRuleFactory.getXamlNamespaces();
      assert.equal( obj.xaml, "http://schemas.microsoft.com/netfx/2009/xaml/activities" );
    } );
  } );

  /**
   * Test getting a xpath processor.
   */
  describe( "#getXpathProcessor()", function() {
    it( "should return a function", function() {
      assert.equal( typeof StyleRuleFactory.getXpathProcessor(), "function" );
    } );
  } );

  /**
   * Test getting a list of XAML files.
   */
   describe( "#getXamlFileList", function() {
     it( "should return an array of four string elements", function() {
       let files = StyleRuleFactory.getXamlFileList( "./test/artefacts" );

       assert.ok( Array.isArray( files ) );
       assert.equal( files.length, 4 );
     } );

     it( "should throw an error if the parameter is not supplied", function() {
       assert.throws( function() {
         StyleRuleFactory.getXamlFileList();
       }, TypeError );
     } );

     it( "should throw an error if the parameter is not a string", function() {
       assert.throws( function() {
         StyleRuleFactory.getXamlFileList( new Object );
       }, TypeError );
     } );
   } );

   /**
    * Test getting the UiPath project data.
    */
   describe( "#getUiPathProjectInfo", function() {
    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        StyleRuleFactory.getUiPathProjectInfo();
      }, TypeError );
    } );

    it( "should throw an error if the parameter is not a string", function() {
      assert.throws( function() {
        StyleRuleFactory.getUiPathProjectInfo( new Object );
      }, TypeError );
    } );

    it( "should return an object when a project.json file can be found in the given path", function() {
      let projectInfo = StyleRuleFactory.getUiPathProjectInfo( "./test/artefacts" );
      assert.equal( typeof projectInfo, "object" );
    } );

    it( "should throw an error if the project.json file cannot be read", function() {
      assert.throws( function() {
        StyleRuleFactory.getUiPathProjectInfo( "./test" );
      }, Error );
    } );

   } );
} );
