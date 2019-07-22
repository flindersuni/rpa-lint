import { UiPathProject } from "../UiPathProject.js";

/**
 * Base class for all UiPath project related rules.
 */
 export class BaseProjectRule {

  /**
   * Construct a new BaseProjectRule object.
   *
   * @param {object} project An instantiated UiPathProject object.
   * @since 1.0.0
   */
  constructor( project ) {
    if ( !project || ( project instanceof UiPathProject ) === false ) {
      throw new TypeError( "project parameter is required and must be a UiPathProject object" );
    }

    this.projectInfo = project;

    this.warnings = [];
    this.errors = [];
  }

  /**
   * Check the UiPath project properties against the style rule.
   *
   * @since 1.0.0
   */
  checkStyleRule() {
  }

  /**
   * Return an array of warnings as a result of the style check.
   *
   * @returns {Array} An array of warning strings.
   * @since 1.0.0
   */
  getWarnings() {
    return this.warnings;
  }

  /**
   * Return an array of errors as a result of the style check.
   *
   * @returns {Array} An array of error strings.
   * @since 1.0.0
   */
  getErrors() {
    return this.errors;
  }
 }
