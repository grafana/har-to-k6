# har-to-k6

Convert LI-HAR to k6 script.

## CLI Usage

Install globally:

```shell
npm install --global har-to-k6
```

Use `har-to-k6` to convert. If a compatibility layer is generated it will be
written to `compat.js` next to your k6 script.

```shell
har-to-k6 archive.har -o loadtest.js
```

## API Usage

Install to your package:

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
  fs.writeFileSync("./load-test.js", main);
  if (compat) {
    fs.writeFileSync("./compat.js", compat);
  }
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
    throw error;
  }
}
```

## Browser Usage

`har-to-k6` can be bundled for use in the browser. This exposes the standard
API under `harToK6`.

Clone the repository:

```shell
git clone https://github.com/loadimpact/har-to-k6
cd har-to-k6
```

Run the script to produce a bundle. It takes a minute to build and optimize:

```shell
npm run bundle
```

Load `build/har-to-k6.js` into your HTML page:

```html
<html>
  <head>
    <title>HAR Converter</title>
    <script src="har-to-k6.js"></script>
    <script src="index.js"></script>
  </head>
</html>
```

The API is available:

```js
async function run () {
    const archive = readArchive();
    harToK6.validate(archive);
    const { main, compat } = await harToK6.liHARToK6Script(archive);
    displayResult(main, compat);
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
