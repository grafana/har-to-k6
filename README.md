# har-to-k6

Convert LI-HAR to k6 script.

## Usage

Install with npm:

```shell
npm install --save har-to-k6
```

Use `liHARToK6Script()` to convert. If a compatibility layer is returned place
it in `compat.js` next to the output script:

```js
const fs = require("fs");
const { liHARToK6Script } = require("har-to-k6");

async function run () {
  const archive = readArchive();
  const { main, compat } = await liHARToK6Script(archive);
  fs.writeFileSync('./load-test.js', main)
  fs.writeFileSync('./compat.js', compat)
}
```

Use `validate()` to run validation alone. Returns without error for a valid
archive. Throws `InvalidArchiveError` for validation failure.

```js
const { InvalidArchiveError, validate } = require("har-to-k6");

const archive = readArchive();
try {
  validate(archive);
} catch (error) {
  if (error instanceof InvalidArchiveError) {
    // Handle invalid archive
  } else {
    throw error
  }
}
```

## Specification

This is a specification describing the following:
- [LI-HAR](li-har.spec.md) - Static configuration format representing a
  [_K6 script_](https://docs.k6.io/docs)
- [LI-HAR to K6 converter](converter.spec.md) - JavaScript package or function
  that converts a given [_LI-HAR_](li-har.spec.md) to a
  [_K6 script_](https://docs.k6.io/docs)
- [LI-HAR to K6 CLI tool](cli-tool.spec.md) - a Node.js CLI tool exposing an
  interface for converting a given [_LI-HAR_](li-har.spec.md) to a
  [_K6 script_](https://docs.k6.io/docs)
