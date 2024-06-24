# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2024-06-24

### Changed

-   Updated Foris JS library to v6.0.0
-   Updated dependencies in package.json
-   Updated .gitignore to exclude Ruff cache files
-   NPM audit fix

### Removed

-   Removed redundant .gitkeep file

## [1.0.0] - 2024-03-07

### Added

-   Added & updated Weblate translations

### Changed

-   Updated dependencies in package.json
-   Updated Node.js to v21.x in Makefile
-   Updated ESLint and Prettier configurations
-   Updated .gitignore to exclude minified JS files and license files
-   Updated webpack.config.js with process/browser alias
-   Updated CI to use shared scripts, build and publish python package
-   Replaced Pylint & Pycodestyle for Ruff
-   NPM audit fix

### Removed

-   Removed MANIFEST.in

## [0.4.0] - 2022-03-23

-   Add & update translations
-   Add Sentinel device token
-   Add missing peerDependencies
-   Update Foris JS library to v5.4.0
-   Update required NodeJS version to 16.x
-   Fix spelling & grammar in helpTexts
-   Fix translation strings
-   Move reforis to devel dependencies
-   Improve description & add repo URL
-   Remove obsolete setuptools version pin
-   NPM audit fix

## [0.3.2] - 2021-09-09

-   Add & update translations
-   Replace `attack detection` by `threat detection`
-   NPM audit fix

## [0.3.1] - 2021-07-15

-   Fix for Sentinel fwlogs replacing nikola

## [0.3.0] - 2021-06-30

-   Add Sentinel State
-   Add Sentinel Components
-   Add API /state endpoint
-   Add & update translations
-   Refine headings and page descriptions
-   Restructure js files and folders
-   Rename Data Collection tab to License Agreement
-   Make reforis regular dependency instead of extras
-   Remove foris-client & paho-mqtt from extras
-   Drop versions of python dependencies
-   Update Foris JS library to v5.1.13
-   NPM audit fix
-   Other small improvements

## [0.2.5] - 2021-02-03

-   Add & update translations
-   Remove duplicated file for Norwegian language
-   Update Foris JS library to v5.1.10

## [0.2.4] - 2020-11-25

-   Fix Terms of Participation's modal size
-   Move Data Collection under Sentinel tab

## [0.2.3] - 2020-10-07

-   Just bump version

## [0.2.2] - 2020-10-06

-   Restructure EULA's form (fluid-layout support)
-   Use Foris JS v5.1.5
-   NPM audit fix
-   Integrate ESLint + Prettier + reForis styleguide
-   Format all files with Prettier

## [0.2.1] - 2020-07-13

-   NPM audit fix
-   Swap license agreement radio buttons

## [0.2.0] - 2020-03-27

-   Use ForisJS 4.5.0.
-   NPM audit fix & update packages
-   Fix propTypes

## [0.1.1] - 2020-03-02

-   Add translations

## [0.1.0] - 2020-02-27

-   Basic EULA agreement

[unreleased]: https://gitlab.nic.cz/turris/reforis/reforis-data-collection/-/compare/v1.1.0...master
[1.1.0]: https://gitlab.nic.cz/turris/reforis/reforis-data-collection/-/compare/v1.0.0...v1.1.0
[1.0.0]: https://gitlab.nic.cz/turris/reforis/reforis-data-collection/-/compare/v0.4.0...v1.0.0
[0.4.0]: https://gitlab.nic.cz/turris/reforis/reforis-data-collection/-/compare/v0.3.2...v0.4.0
[0.3.2]: https://gitlab.nic.cz/turris/reforis/reforis-data-collection/-/compare/v0.3.1...v0.3.2
[0.3.1]: https://gitlab.nic.cz/turris/reforis/reforis-data-collection/-/compare/v0.3.0...v0.3.1
[0.3.0]: https://gitlab.nic.cz/turris/reforis/reforis-data-collection/-/compare/v0.2.5...v0.3.0
[0.2.5]: https://gitlab.nic.cz/turris/reforis/reforis-data-collection/-/compare/v0.2.4...v0.2.5
[0.2.4]: https://gitlab.nic.cz/turris/reforis/reforis-data-collection/-/compare/v0.2.3...v0.2.4
[0.2.3]: https://gitlab.nic.cz/turris/reforis/reforis-data-collection/-/compare/v0.2.2...v0.2.3
[0.2.2]: https://gitlab.nic.cz/turris/reforis/reforis-data-collection/-/compare/v0.2.1...v0.2.2
[0.2.1]: https://gitlab.nic.cz/turris/reforis/reforis-data-collection/-/compare/v0.2.0...v0.2.1
[0.2.0]: https://gitlab.nic.cz/turris/reforis/reforis-data-collection/-/compare/v0.1.1...v0.2.0
[0.1.1]: https://gitlab.nic.cz/turris/reforis/reforis-data-collection/-/compare/v0.1.0...v0.1.1
[0.1.0]: https://gitlab.nic.cz/turris/reforis/reforis-data-collection/-/tags/v0.1.0
