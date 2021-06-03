import * as util from "util";

export class MyGetApiMock {

  /**
   * Construct a new object.
   *
   * @classdesc The rpa-lint app uses the [sync-request](https://www.npmjs.com/package/sync-request) package to retrieve NuGet package
   * information form the official package feed. This is not desirable when running unit tests for three main reasons.
   * 1. The synchronous API requests have a negative impact on the speed of the unit tests.
   * 2. The tests are no longer deterministic as the package information changes.
   * 3. It's not fair to repeatedly call a public API just for testing purposes.
   * This class is used in the unit tests to dynamically replace the real sync-request functionality with a mock object.
   * @constructs
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
