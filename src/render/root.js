const imports = require('./imports')
const lead = require('./lead')
const logic = require('./logic')
const options = require('./options')

/**
 * @param {*|Array<*>} result
 * @return {string}
 */
function root(result) {
  const results = Array.isArray(result) ? result : [result]
  const [main] = results
  const logicMethods = results.map((result) => logic(result))

  return [lead(main), imports(main.imports), options(main), ...logicMethods]
    .filter((item) => item)
    .join(`\n\n`)
}

module.exports = root
