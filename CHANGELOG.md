# Changelog
All notable changes to this project will be documented in this file.

The format has been based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.9.0] - 2021-03-18

### Added

- `--add-sleep` flag for CLI
- New export `normalizeHAR`

### Fixed

- Entries are sorted

## [0.8.0] - 2021-02-22

### Changed

- Remove usage of [emailjs-mime-builder](https://github.com/emailjs/emailjs-mime-builder) to generate `multipart/form-data` payloads, use [jslib-formdata-polyfill](https://jslib.k6.io/formdata/0.0.1/index.js) instead

### Fixed

- Duplicate `Content-Type` header when using custom `boundary` in `multipart/form-data`

## [0.7.0] - 2021-01-18

### Changed

- Warn instead of throwing when incoming `postData.mimeType` and `Content-Type` does not align.

## [0.6.0] - 2020-12-07

### Changed

- `queryString` items are no longer added if key/value pair is already in request

### Fixed
- Invalid script generated when request protocol was missing
- Double URI encoding of `queryString` items

## [0.5.0] - 2020-09-09

### Added

- CSS-selector variable declaration support

### Changed

- Less strict validation of `postData.params`
- Warning instead of throw when `postData.params` and `postData.text` is not equal
    
## [0.4.0] - 2020-08-18

### Added
- Type checking support

## [0.3.3] - 2020-06-08

### Fixed
- Set engine node >= 11.0.0

## [0.3.2] - 2020-06-05

### Fixed
- Empty name queryString item throws validation error.
- Make cookie validation less strict.

## [0.3.1] - 2020-05-28

### Fixed
- Variables not being resolved in correct order

## [0.3.0] - 2020-04-03

### Added
- Support fixed cases of multipart/form-data

### Fixed
- Empty postData param value causes converter crash

## [0.2.0] - 2020-03-13

### Changed
- Less strict validation for postData
- Prioritize postData.params over postData.text

### Added
- Run babel on standalone bundle

## [0.1.5] - 2020-02-17

### Fixed
- Remove pseudo headers
- Remove cookies
- Remove Content-Length header

## [0.1.4] - 2020-02-05

### Fixed
- Allow charset in postData mimeType
- Use both id and title for group name

## [0.1.3] - 2019-08-05

### Changed
Start using scheme for jslib module imports.

## [0.1.2] - 2019-07-10

### Fixed
Missing sleep import.

## [0.1.1] - 2019-07-09

### Added
- add CHANGELOG

### Fixed
Broken positional arg in caporal resulting in broken `har-to-k6` command.

## [0.1.0] - 2019-07-09
### Added
- Initial release

[Unreleased]: https://github.com/loadimpact/har-to-k6/compare/v0.9.0...HEAD
[0.9.0]: https://github.com/loadimpact/har-to-k6/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/loadimpact/har-to-k6/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/loadimpact/har-to-k6/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/loadimpact/har-to-k6/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/loadimpact/har-to-k6/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/loadimpact/har-to-k6/compare/v0.3.3...v0.4.0
[0.3.3]: https://github.com/loadimpact/har-to-k6/compare/v0.2.0...v0.3.3
[0.3.2]: https://github.com/loadimpact/har-to-k6/compare/v0.2.0...v0.3.2
[0.3.1]: https://github.com/loadimpact/har-to-k6/compare/v0.2.0...v0.3.1
[0.3.0]: https://github.com/loadimpact/har-to-k6/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/loadimpact/har-to-k6/compare/v0.1.5...v0.2.0
[0.1.5]: https://github.com/loadimpact/har-to-k6/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/loadimpact/har-to-k6/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/loadimpact/har-to-k6/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/loadimpact/har-to-k6/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/loadimpact/har-to-k6/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/olivierlacan/keep-a-changelog/releases/tag/v0.1.0
