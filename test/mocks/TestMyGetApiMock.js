import { MyGetApiMock } from "../../app/mocks/MyGetApiMock.js";

import * as assert from "assert";

/**
 * Test the MyGet Api mock object.
 */
describe( "MyGetApiMock", function() {

  /**
   * Test the constructor.
   */
  describe( "#constructor", function() {

    it( "should throw an error if the verb parameter is not supplied", function() {
      assert.throws( function() {
        new MyGetApiMock();
      }, TypeError );
    } );

    it( "should throw an error if the verb parameter is not a string ", function() {
      assert.throws( function() {
        new MyGetApiMock( new Object() );
      }, TypeError );
    } );

    it( "should throw an error if the url parameter is not supplied", function() {
      assert.throws( function() {
        new MyGetApiMock( "GET" );
      }, TypeError );
    } );

    it( "should throw an error if the url parameter is not a string ", function() {
      assert.throws( function() {
        new MyGetApiMock( "GET", new Object() );
      }, TypeError );
    } );

    it( "should throw an error if the url isn't for the right host", function() {
      assert.throws( function() {
        new MyGetApiMock( "GET", "https://example.com" );
      }, TypeError );
    } );

    it( "should not throw an error when both parameters are correct", function() {

      assert.doesNotThrow( function() {
        new MyGetApiMock( "GET", "https://www.myget.org/F/workflow/api/v3/query" );
      }, TypeError );
    } );

  } );

  /**
   * Test the retrieval of the test artefacts to simulate the JSON payload from the API.
   */
  describe( "#getBody", function() {

    it( "should throw an error if the parameter is not supplied", function() {

      let mockObj = new MyGetApiMock( "GET", "https://www.myget.org/F/workflow/api/v3/query?q=UiPath.Credentials.Activities" );

      assert.throws( function() {
        mockObj.getBody();
      }, TypeError );
    } );

    it( "should throw an error if the parameter is not a string ", function() {

      let mockObj = new MyGetApiMock( "GET", "https://www.myget.org/F/workflow/api/v3/query?q=UiPath.Credentials.Activities" );

      assert.throws( function() {
        mockObj.getBody( new Object() );
      }, TypeError );
    } );

    it( "should throw an error if the encoding isn't correct", function() {

      let mockObj = new MyGetApiMock( "GET", "https://www.myget.org/F/workflow/api/v3/query?q=UiPath.Credentials.Activities" );

      assert.throws( function() {
        mockObj.getBody( "utf7" );
      }, TypeError );
    } );

    it( "should return a string when the package name is known", function() {

      const pckgNames = [
        "UiPath.Credentials.Activities",
        "UiPath.Excel.Activities",
        "UiPath.Mail.Activities",
        "UiPath.System.Activities",
        "UiPath.UIAutomation.Activities"
      ];

      pckgNames.forEach( function( value ) {
        let mockObj = new MyGetApiMock( "GET", "https://www.myget.org/F/workflow/api/v3/query?q=" + value );

        assert.ok( typeof( mockObj.getBody( "utf8" ) ) === "string" );
      } );
    } );

    it( "should throw an error if the package name is unknown", function() {

      let mockObj = new MyGetApiMock( "GET", "https://www.myget.org/F/workflow/api/v3/query?q=UnknownPackage" );

      assert.throws( function() {
        mockObj.getBody( "utf8" );
      }, Error );
    } );

  } );
} );
