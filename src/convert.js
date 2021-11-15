const parse = require('./parse')
const render = require('./render')
const validate = require('./validate')
const normalize = require('./normalize')
const { DEFAULT_OPTIONS } = require('./constants')
const { InvalidArchiveError } = require('./error')
const combineImports = require('./combineImports')
const combineExports = require('./combineExports')

/**
 * Convert one or many HAR objects, into k6 script
 * @param {HAR|Array<HAR>} _archives
 * @param options
 * @return {Promise<{main: *}>}
 */
async function convert(_archives, options = DEFAULT_OPTIONS) {
  const isMultiConvert = Array.isArray(_archives)
  const archives = !isMultiConvert ? [_archives] : _archives

  const result = archives.map((archive, index) => {
    const source = normalize(archive, options)

    try {
      validate(source)
    } catch (error) {
      throw new InvalidArchiveError(
        { name: error.name },
        isMultiConvert ? `Archive(${index}): ${error.message}` : error.message
      )
    }

    return parse(source)
  })

  const imports = combineImports(result)

  // combine exports to make sure we only have one default export and no
  // colliding function names (result item (.exportAs and/or .defaultExport) is
  // mutated) in place
  combineExports(result)

  // NOTE: => render(result) instead of { main: render(result) } ??
  // Then /bin/har-to-k6.js need to change as well.
  return {
    main: render(result, imports),
  }
}

module.exports = convert
