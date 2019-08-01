import { UiPathProject } from "../UiPathProject.js";

 export class BaseProjectRule {

  /**
   * Construct a new object.
   *
   * @classdesc Base class for all UiPath project related rules.
   *
   * @constructs
   *
   * @param {UiPathProject} project An instantiated UiPathProject object.
   * @throws {TypeError} When the project parameter is missing or the incorrect type.
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
    throw new Error( "Function 'checkStyleRule' is no implemented in base class." );
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
