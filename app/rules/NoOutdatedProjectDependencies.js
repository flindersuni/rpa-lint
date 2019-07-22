import { BaseProjectRule } from "./BaseProjectRule.js";

import compareVersions from "compare-versions";
import request from "sync-request";
import * as util from "util";

/**
 * Class to implement the rule that there are to be no outdated UiPath project dependencies.
 *
 */
export class NoOutdatedProjectDependencies extends BaseProjectRule {

 /**
  * Construct a new NoOutdatedProjectDependencies object.
  *
  * @param {object} project An instantiated UiPathProject object.
  * @since 1.0.0
  */
  constructor( project ) {
    super( project );

    this.nuGetRepoQueryUrl = "https://www.myget.org/F/workflow/api/v3/query?q=";
  }

  /**
   * Check the project for outdated dependencies.
   *
   * @since 1.0.0
   */
  checkStyleRule() {

    // Get a list of dependencies.
    let dependencies = this.projectInfo.getDependencies();


    // Keep a reference to the outer object.
    const self = this;

    // Check each dependency.
    dependencies.forEach( function( pkgVersion, pkgName ) {

      // Skip Flinders University packages.
      if ( pkgName.startsWith( "Flinders" ) ) {
        return;
      }

      let result = request( "GET", self.nuGetRepoQueryUrl + pkgName );
      let pkgJson = JSON.parse( result.getBody( "utf8" ) );

      // Compare version numbers.
      if ( !compareVersions.compare( pkgVersion, pkgJson.data[ 0 ].version, "=" ) ) {
        self.errors.push(
          util.format(
            "The '%s' package with version %s is outdated by version %s.",
            pkgName,
            pkgVersion,
            pkgJson.data[ 0 ].version
          )
        );
      }
    } );
  }
}
