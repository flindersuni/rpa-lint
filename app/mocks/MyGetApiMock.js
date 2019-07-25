import * as util from "util";

/**
 * A class that provides mock sync-request functionality for the MyGet NuGet API.
 */
export class MyGetApiMock {

  /**
   * Construct a new MyGetApiMock object.
   *
   * @param {string} verb The HTTP verb used when calling the API endpoint.
   * @param {string} apiUrl The URL to the MyGet API endpoint.
   * @throws {TypeError} When the url parameter is missing, the incorrect type, or is not for the MyGet website.
   * @since 1.0.0
   */
  constructor( verb, apiUrl ) {

    if ( !verb || !( typeof( verb ) === "string" ) || verb !== "GET" ) {
      throw new TypeError( "verb parameter is required, must be a string, and must be 'GET'" );
    }

    if ( !apiUrl || !( typeof( apiUrl ) === "string" ) || !apiUrl.startsWith( "https://www.myget.org/" ) ) {
      throw new TypeError( "apiUrl parameter is required, must be a string, and must start with 'https://www.myget.org/'" );
    }

    this.apiUrl = new URL( apiUrl );

  }

  /**
   * Return a prepared JSON string from one of the test artefacts.
   *
   * @param {string} enc The encoding parameter to match the real sync-request object.
   * @returns {string} String representation of the JSON object from the prepared artefact.
   * @throws {TypeError} When the encoding parameter is missing, the incorrect type, or is not 'utf8'.
   * @since 1.0.0
   */
  getBody( enc ) {

    if ( !enc || !( typeof enc === "string" ) || enc !== "utf8" ) {
      throw new TypeError( "encoding parameter is required, must be a string, and must be 'utf8'" );
    }

    // Determine which artefact to return.
    let pckgName = this.apiUrl.searchParams.get( "q" );
    let jsonObj = null;

    switch ( pckgName ) {
      case "UiPath.Credentials.Activities":
        jsonObj = require( "../../test/artefacts/UiPath.Credentials.Activities.json" );
        break;
      case "UiPath.Excel.Activities":
        jsonObj = require( "../../test/artefacts/UiPath.Excel.Activities.json" );
        break;
      case "UiPath.Mail.Activities":
        jsonObj = require( "../../test/artefacts/UiPath.Mail.Activities.json" );
        break;
      case "UiPath.System.Activities":
        jsonObj = require( "../../test/artefacts/UiPath.System.Activities.json" );
        break;
      case "UiPath.UIAutomation.Activities":
        jsonObj = require( "../../test/artefacts/UiPath.UIAutomation.Activities" );
        break;
      default:
        throw new Error( util.format( "The '%s' package was not recognised", pckgName ) );
    }

    return JSON.stringify( jsonObj );
  }
}