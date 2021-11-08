const imports = require('./imports')
const lead = require('./lead')
const logic = require('./logic')
const options = require('./options')

/*
 * @param {*|Array<*>} _results
 * @return {string}
 */
function root(_results) {
  const results = Array.isArray(_results) ? _results : [_results]
  const isMultipleResults = results.length > 1
  const [main] = results

  const resolvedImports = {}
  const logicFunctions = []
  const functionNames = []
  let defaultExported = false

  for (const result of results) {
    let nameIndex = ''
    const defaultExport = !defaultExported && result.defaultExport
    if (defaultExport) {
      defaultExported = true
    }
    let { exportAs: functionName } = result
    while (functionNames.includes(`${functionName}${nameIndex}`)) {
      nameIndex = nameIndex === '' ? 0 : nameIndex + 1
    }
    functionName += nameIndex
    functionNames.push(functionName)

    logicFunctions.push(
      [
        isMultipleResults ? lead(result) : null,
        logic({ ...result, exportAs: functionName }, defaultExport),
      ]
        .filter(item => item)
        .join('\n\n')
    )

    // build imports object
    Object.entries(result.imports || {}).forEach(([key, value]) => {
      if (value === true || resolvedImports[key] === undefined) {
        resolvedImports[key] = value
      }
    })
  }

  return [
    !isMultipleResults ? lead(main) : null,
    imports(resolvedImports),
    options(main),
    ...logicFunctions,
  ]
    .filter(item => item)
    .join(`\n\n`)
}

module.exports = root
