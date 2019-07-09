# Flinders XAML Style Check
This is a [Node.js][nodejs] app that is used to check our work against rules that have been agreed to by the RPA development team at [Flinders University][flinders].

The app uses a static analysis to check the [XAML][xaml] files in our [UiPath][https://www.uipath.com/] projects.

## Why use Node.js?
The decision to use Node.js for this app was made for two main reasons:

1. The app needed to be cross platform. So that it can be run during development of workflows using UiPath on Windows, and on common continuous integration infrastructure.
2. JavaScript continues to be one of the [most popular][stackoverflow] development languages.

## Installation
To install the app:

1. Download and install Node.js onto your computer
2. Clone this repository
3. Install the project dependencies using a command like:

    ```
    $ npm install
    ````

## Unit Tests
We use the [Mocha][mochajs] framework for unit tests. To run the tests:

```
$ npm run test
```

## Test Coverage
We use the [Istanbul][instanbuljs] framework to generate a test coverage report. To generate the report:

```
$ npm run coverage
```

## JavaScript Linting
We use the [ESLint][eslint] utility to lint the JavaScript code. To lint the code:

```
$ npm run lint
```

Take a look at the `eslintrc.json` file to see which rules we apply.

## Documenting the Code
We use [JSDoc][jsdoc] to generate internal API documentation. To generate the documentation:

```
$ npm run docs
```


[eslint]: https://eslint.org/
[flinders]: https://www.flinders.edu.au/
[instanbuljs]: https://istanbul.js.org/
[jsdoc]: https://jsdoc.app/
[mochajs]: https://mochajs.org/
[nodejs]: https://nodejs.org/
[stackoverflow]: https://insights.stackoverflow.com/survey/2019#technology-_-programming-scripting-and-markup-languages
[xaml]: https://en.wikipedia.org/wiki/Extensible_Application_Markup_Language
