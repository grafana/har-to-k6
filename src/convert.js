const parse = require('./parse')
const render = require('./render')
const validate = require('./validate')
const normalize = require('./normalize')
const { DEFAULT_OPTIONS } = require('./constants')
const { resetResultImports } = require('./make')

/**
 * Convert one or many HAR objects, into k6 script
 * @param {HAR|Array<HAR>} _archives
 * @param options
 * @return {Promise<{main: *}>}
 */
async function convert(_archives, options = DEFAULT_OPTIONS) {
  const archives = !Array.isArray(_archives) ? [_archives] : _archives

  // Persist imports when dealing with multiple archives
  const persistImports = archives.length > 1
  const result = archives.map((archive) => {
    const source = normalize(archive, options)
    validate(source)

    return parse(source, persistImports)
  })

  // Reset result imports so that result.importsState isn't tainted between calls
  resetResultImports()

  // NOTE: => render(result) instead of { main: render(result) } ??
  // Then /bin/har-to-k6.js need to change as well.
  return {
    main: render(...result),
  }
}

module.exports = convert
