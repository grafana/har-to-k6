# LI-HAR to K6 CLI tool
A Node.js CLI tool exposing an interface for converting a [_LI-HAR config_](li-har.spec.md) to a [_K6 script_](https://docs.k6.io/docs).  

### Requirements
* The CLI tool should be installable and runnable in Node.js (current LTS release) on OS X, Windows and Linux.  
* The CLI tool should utilise the [_LI-HAR converter_](converter.spec.md) package.


#### Naive implementation

```javascript
// har-to-k6 CLI tool
const fs = require("fs-extra");
const yargs = require("yargs");
const { liHARToK6Script } = require("har-to-k6");

const argv = yargs
  .usage("har-to-k6 <har-file>")
  .usage("har-to-k6 <har-file> -o <k6-file>")
  .option("out", {
    alias: "o",
    describe: "Output file",
    type: "string"
  }).argv;

function exit() {
  yargs.showHelp();
  process.exit(1);
}

const input = argv._[0] || exit();
const output = argv.out;

if (output) {
  const har = fs.readFileSync(input, { encoding: "utf8" });
  fs.outputFileSync(`${output}/test.js`, liHARToK6Script(har));
  console.log("Success");
} else {
  console.log("Please specify output file name");
}
```


```bash
# Usage

$ har-to-k6

har-to-k6 <har-file>
har-to-k6 <har-file> -o <k6-file>

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --out, -o  Output file                                                [string]
```

```shell
$ har-to-k6 myharfile.har -o myk6script.js
```

__Resources__ 
- [LI-HAR spec](li-har.spec.md)  
- [LI-HAR converter](converter.spec.md)
- [K6 docs](https://docs.k6.io/docs)
