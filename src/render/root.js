const imports = require('./imports')
const lead = require('./lead')
const logic = require('./logic')
const options = require('./options')

/*
 * @param {*|Array<*>} _results
 * @return {string}
 */
function root(_results, _imports) {
  const results = Array.isArray(_results) ? _results : [_results]
  const isMultipleResults = results.length > 1
  const [main] = results
  const logicFunctions = []

  for (const result of results) {
    logicFunctions.push(
      [isMultipleResults ? lead(result) : null, logic(result)]
        .filter(item => item)
        .join('\n\n')
    )
  }

  return [
    !isMultipleResults ? lead(main) : null,
    imports(_imports),
    options(main),
    ...logicFunctions,
  ]
    .filter(item => item)
    .join(`\n\n`)
}

module.exports = root
