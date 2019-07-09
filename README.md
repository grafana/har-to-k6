# har-to-k6

Convert [LI-HAR](li-har.spec.md) and [HAR](https://w3c.github.io/web-performance/specs/HAR/Overview.html) to [K6 script](https://docs.k6.io/docs).

* [CLI usage](#cli-usage)
* [API usage](#api-usage)




## CLI Usage


__Install Globally__ - preferably using [nvm](https://github.com/creationix/nvm) (at least on Unix/Linux systems to avoid filesystem permission issues when using sudo):
```shell
npm install --global har-to-k6
```

__Locally__ - into node_modules
```shell
npm install har-to-k6
```
__Note__: that this will require you to run the converter with `node node_modules/har-to-k6/bin/har-to-k6.js ...`

###  Convert
Use `har-to-k6` to convert.

```shell
har-to-k6 archive.har -o loadtest.js
```

------------

## API Usage

__Install__

```shell
npm install --save har-to-k6
```

Use `liHARToK6Script()` to convert.

```js
const fs = require("fs");
const { liHARToK6Script } = require("har-to-k6");

async function run () {
  const archive = readArchive();
  const { main } = await liHARToK6Script(archive);
  fs.writeFileSync("./load-test.js", main);
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

`har-to-k6` can be ran in the browser. This exposes the standard
API under `harToK6`.


Importing as ES module
```javascript
import { liHARToK6Script } from "har-to-k6";
```
CJS style
```javascript
const { liHARToK6Script } = require("har-to-k6");
```

Script tag

Load `standalone.js` into your HTML page:

```html
<html>
  <head>
    <title>HAR Converter</title>
    <script src="standalone.js"></script>
    <script src="index.js"></script>
  </head>
</html>
```

The API is available:

```js
async function run () {
    const archive = readArchive();
    harToK6.validate(archive);
    const { main } = await harToK6.liHARToK6Script(archive);
    displayResult(main);
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
