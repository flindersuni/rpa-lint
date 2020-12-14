import { StyleRuleFactory } from "../app/StyleRuleFactory.js";
import { UiPathProject } from "../app/UiPathProject.js";
import * as assert from "assert";
import fs from "fs";

// Use a constant to make updating this value during development / test cycles easier.
const expectedNamespaceCount = 5;
const expectedXamlFileCount = 5;
const expectedRecursiveXamlFileCount = 6;

/**
 * Test the StyleRuleFactory object.
 */
describe( "StyleRuleFactory", function() {

  /**
   * Test constructing a new instance of the class.
   */
  describe( "#constructor", function() {
    it( "should not throw any errors", function() {
      assert.doesNotThrow( function() {
        new StyleRuleFactory();
      }, Error );
    } );
  } );

  /**
   * Test getting the list of supported XML namespaces.
   */
  describe( "#getXamlNamespaces", function() {
    it( "should return an object", function() {
      assert.strictEqual( typeof StyleRuleFactory.getXamlNamespaces(), "object" );
    } );

    it( "should return a object with 4 properties", function() {
      let obj = StyleRuleFactory.getXamlNamespaces();
      assert.strictEqual( Object.keys( obj ).length, expectedNamespaceCount );
    } );

    it( "should return an object that contains a xaml property", function() {
      let keys = Object.keys( StyleRuleFactory.getXamlNamespaces() );
      assert.ok( keys.includes( "xaml" ), "xaml object property missing" );
    } );

    it( "should return an object that has a xaml property with the correct URI", function() {
      let obj = StyleRuleFactory.getXamlNamespaces();
      assert.strictEqual( obj.xaml, "http://schemas.microsoft.com/netfx/2009/xaml/activities" );
    } );
  } );

  /**
   * Test getting a xpath processor.
   */
  describe( "#getXpathProcessor", function() {
    it( "should return a function", function() {
      assert.strictEqual( typeof StyleRuleFactory.getXpathProcessor(), "function" );
    } );
  } );

  /**
   * Test getting a list of XAML files.
   */
   describe( "#getXamlFileList", function() {
     it( "should return an array of four string elements", function() {
       let files = StyleRuleFactory.getXamlFileList( "./test/artefacts" );

       assert.ok( Array.isArray( files ) );
       assert.strictEqual( files.length, expectedXamlFileCount );
     } );

     it( "should return an array of the right number of string elements", function() {
      let files = StyleRuleFactory.getXamlFileList( "./test/artefacts", true );

      assert.ok( Array.isArray( files ) );
      assert.strictEqual( files.length, expectedRecursiveXamlFileCount );
    } );

     it( "should throw an error if the targetPath parameter is not supplied", function() {
       assert.throws( function() {
         StyleRuleFactory.getXamlFileList();
       }, TypeError );
     } );

     it( "should throw an error if the targetPath parameter is not a string", function() {
       assert.throws( function() {
         StyleRuleFactory.getXamlFileList( new Object );
       }, TypeError );
     } );

     it( "should throw an error if the recursive parameter is not a boolean", function() {
      assert.throws( function() {
        StyleRuleFactory.getXamlFileList( "./test/artefacts", new Object );
      }, TypeError );
    } );
   } );

   /**
    * Test filtering a list of XAML files.
    */
   describe( "#filterPublicWorkflows", function() {
    it( "should throw an error if the parameters are not supplied", function() {
      assert.throws( function() {
        StyleRuleFactory.filterPublicWorkflows();
      }, TypeError );

      assert.throws( function() {
        StyleRuleFactory.filterPublicWorkflows( [] );
      }, TypeError );
    } );

    it( "should throw an error if the parameters are of the wrong type", function() {
      assert.throws( function() {
        StyleRuleFactory.filterPublicWorkflows( {}, [] );
      }, TypeError );

      assert.throws( function() {
        StyleRuleFactory.filterPublicWorkflows( [], [] );
      }, TypeError );
    } );

    it( "should return all files if no XAML files are marked as private", function() {
      let files = StyleRuleFactory.getXamlFileList( "./test/artefacts" );
      let projectInfo = new UiPathProject( "./test/artefacts" );
      projectInfo.fileContents.libraryOptions.privateWorkflows = [];

      let publicXaml = StyleRuleFactory.filterPublicWorkflows(
        files,
        projectInfo
      );

      assert.ok( Array.isArray( publicXaml ) );
      assert.strictEqual( files.length, publicXaml.length );
    } );
   } );

   it( "should return all files if no matching private XAML files are found", function() {
    let files = StyleRuleFactory.getXamlFileList( "./test/artefacts" );
    let projectInfo = new UiPathProject( "./test/artefacts" );

    let publicXaml = StyleRuleFactory.filterPublicWorkflows(
      files,
      projectInfo
    );

    assert.ok( Array.isArray( publicXaml ) );
    assert.strictEqual( files.length, publicXaml.length );
   } );

   it( "should return less files when matching private XAML files are found", function() {
    let files = StyleRuleFactory.getXamlFileList( "./test/artefacts" );
    let projectInfo = new UiPathProject( "./test/artefacts" );

    files.push( projectInfo.getPrivateWorkflows()[ 1 ] );

    let publicXaml = StyleRuleFactory.filterPublicWorkflows(
      files,
      projectInfo
    );

    assert.ok( Array.isArray( publicXaml ) );
    assert.strictEqual( ( files.length - 1 ), publicXaml.length );
   } );

  /**
   * Test getting data from a TOML file.
   */
  describe( "#getTomlData", function() {
    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        StyleRuleFactory.getTomlData();
      }, TypeError );
    } );

    it( "should throw an error if the parameter is of the wrong type", function() {
      assert.throws( function() {
        StyleRuleFactory.getTomlData( new Object() );
      }, TypeError );
    } );

    it( "should throw an error if the dataset cannot be found", function() {
      assert.throws( function() {
        StyleRuleFactory.getTomlData( "MissingDataset.toml" );
      }, Error );
    } );

    it( "should return a Map object with data from the TOML file", function() {
      let tomlData = StyleRuleFactory.getTomlData( "ImportantActivities" );

      assert.ok( tomlData instanceof Map );
      assert.ok( tomlData.size > 0 );
      assert.ok( tomlData.has( "sequence" ) );
      assert.ok( tomlData.get( "sequence" ) instanceof Object );
    } );

    it( "should return a Map of objects with the expected properties", function() {
      let tomlData = StyleRuleFactory.getTomlData( "ImportantActivities" );

      let keys = Object.keys( tomlData.get( "sequence" ) );
      assert.ok( keys.length = 3 );
      assert.ok( keys.includes( "description" ) );
      assert.ok( keys.includes( "lenientMatch" ) );
      assert.ok( keys.includes( "strictMatch" ) );

    } );
  } );

  /**
   * Test getting a list of default style rules.
   */
  describe( "#getDefaultStyleRules", function() {
    it( "should return an array", function() {
      let styleRules = StyleRuleFactory.getDefaultStyleRules();
      assert.ok( Array.isArray( styleRules ) );
    } );

    it( "should return an array with the right number of elements", function() {
      let styleRules = StyleRuleFactory.getDefaultStyleRules();
      const elementCount = 10;

      assert.ok( Array.isArray( styleRules ) );
      assert.ok( styleRules.length === elementCount );
    } );
  } );

  /**
   * Test filter the output to a specific file.
   */
  describe( "#filterResults", function() {
    this.slow( 500 );

    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        StyleRuleFactory.filterResults();
      }, TypeError );
    } );

    it( "should throw an error if the parameter is of the wrong type", function() {
      assert.throws( function() {
        StyleRuleFactory.filterResults( "invalid" );
      }, TypeError );
    } );

    it( "should throw an error if the parameter object does not have the required elements", function() {

      let testOutput = "";

      assert.throws( function() {
        StyleRuleFactory.filterResults( testOutput );
      }, TypeError );

      testOutput = new Map();
      assert.doesNotThrow( function() {
        StyleRuleFactory.filterResults( testOutput, " " );
      }, TypeError );

      assert.throws( function() {
        StyleRuleFactory.filterResults( testOutput );
      }, TypeError );

      assert.doesNotThrow( function() {
        StyleRuleFactory.filterResults( testOutput, "test-file" );
      }, TypeError );

    } );

    it( "should return a filtered list of files containing the right number of elements", function() {

      const styleRules = StyleRuleFactory.getDefaultStyleRules();
      const xamlFiles = StyleRuleFactory.getXamlFileList( "./test/artefacts" );

      let results = new Map();

      xamlFiles.forEach( function( file ) {

        let output = {
          warnings: [],
          errors: []
        };

        // eslint-disable-next-line security/detect-non-literal-fs-filename
        let xamlContent = fs.readFileSync( file );
        xamlContent = xamlContent.toString();

        // Apply the style rules to the XAML file.
        styleRules.forEach( function( styleRule ) {
          styleRule.checkStyleRule( xamlContent );

          output.warnings = output.warnings.concat( styleRule.getWarnings() );
          output.errors = output.errors.concat( styleRule.getErrors() );
        } );

        results.set( file, output );
      } );

      assert.ok( results.size > 0 );

      let updatedResults = StyleRuleFactory.filterResults( results, "dos.xaml" );

      assert.ok( updatedResults.size === 1 );

    } );
  } );

} );
