<!-- markdownlint-disable no-trailing-punctuation -->
# RPA Lint #

![Node.js CI](https://github.com/flindersuni/rpa-lint/workflows/Node.js%20CI/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/flindersuni/rpa-lint/badge.svg)](https://coveralls.io/github/flindersuni/rpa-lint)

This app is used by the Robotic Process Automation (RPA) team at [Flinders University][flinders] to lint our RPA projects against an agreed set of rules. We apply these style rules so that our automations are consistent.

We use [UiPath][uipath] to develop and manage our automations.

This app, developed using [Node.js][nodejs], uses static analysis techniques to check the [XAML][xaml] code and project settings against our agreed rules.

## Installation ##

To install the app:

1. Download and install Node.js onto your computer
2. Clone this repository
3. Install the app dependencies using the following command:

    ```shell
    npm install
    ````

4. Link to the package so it can be run from anywhere using the following command:

    ```shell
    npm link
    ```

## Use the App ##

After the app has been linked you can use the app in one of two ways.

### Specify the Path to the UiPath Project ###

You can run the app by specifying the path to the UiPath project folder using the `-i` option. For example:

```shell
rpa-lint -i U:\MyWork\UiPath\Flinders.Foundation\
```

### Automatically use the Current Working Directory ###

Alternatively, if the `-i` option is not set the current working directory is used. For example:

```shell
cd MyWork\UiPath\Flinders.Foundation\
rpa-lint
```

### Command Line Options ###

To see a list of possible command line options, use the `-h` or `--help` option. For example:

```shell
rpa-lint --help
```

## Project Dependency Checking ###

To check the project for outdated dependencies use the `--dep-check` option. For example:

```shell
cd MyWork\UiPath\Flinders.Foundation\
rpa-lint --dep-check
```

## License ##

The app is licensed using the [BSD 3-Clause License](LICENSE). Contributions, such as suggestions for new rules or new features are welcome.

## Frequently Asked Questions ##

### Why use Node.js? ###

This is a good question. Using [Invoke Code][invokecode] activities we could have implemented this type of analysis using UiPath. There are three main reasons for the decision to use Node.js.

1. Our aim is to have as little code as possible in our automations. This makes them easier to develop and maintain. It also makes it easier for less experienced users to work with us on developing automations.
2. The app needed to be cross platform. The app needs to be able to be run locally while developing an automation on Windows. The app also needs to be able to be run on common continuous integration infrastructure. So that code can be automatically checked.
3. JavaScript continues to be one of the [most popular][stackoverflow] development languages. Making it easier for developers to contribute and help maintain the app.

### How do I run the unit tests? ###

We use the popular [Mocha][mochajs] framework to develop and manage unit tests for the app. To run the tests, use the following command:

```shell
npm run test
```

### How much of the app does the unit tests cover? ###

We use the popular [Istanbul][instanbuljs] test coverage tool to monitor the test coverage. To generate a report, use the following command:

```shell
npm run coverage
```

### Do you have a style for the JavaScript code? ###

We use the [ESLint][eslint] utility to lint our JavaScript code. To lint the code, use the following command:

```shell
npm run lint
```

Take a look at the `.eslintrc.json` file to see which rules we apply.

### Is the JavaScript code documented? ###

We use [JSDoc][jsdoc] syntax and the related tool to generation internal documentation for the app. To generate the documentation using the latest version of the code, use the following command:

```shell
npm run docs
```

[eslint]: https://eslint.org/
[flinders]: https://www.flinders.edu.au/
[instanbuljs]: https://istanbul.js.org/
[invokecode]: https://activities.uipath.com/docs/invoke-code
[jsdoc]: https://jsdoc.app/
[mochajs]: https://mochajs.org/
[nodejs]: https://nodejs.org/
[stackoverflow]: https://insights.stackoverflow.com/survey/2019#technology-_-programming-scripting-and-markup-languages
[uipath]: https://www.uipath.com/
[xaml]: https://en.wikipedia.org/wiki/Extensible_Application_Markup_Language
