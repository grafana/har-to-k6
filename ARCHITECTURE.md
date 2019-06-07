Broad divisions are:

* `src/` - Main functionality.
* `test/` - Unit and integration tests.
* `bin/` - CLI code.
* `example/` - Example LI-HAR files for conversion.

Major components under `src/` are:

* `convert.js` - Run conversion. Main entry point. Exposed as
  `liHARToK6Script()`.
* `validate/` - Validate an LI-HAR archive.
* `parse/` - Parse an LI-HAR archive. Produces a structure for use in
  rendering.
* `render/` - Render k6 script. Uses `parse` output.
* `build/` - Build browser bundle.
