const DEFAULT_FUNC_NAME = 'main'

function exportAs(namedExport = false, name = DEFAULT_FUNC_NAME, result) {
  const { defaultExported, functions } = result.exports
  const functionName = [
    name.replace(/\s/g, '_').replace(/\W/g, '') || DEFAULT_FUNC_NAME,
    '',
  ]

  // Handle colliding names
  let nameIndex = 0
  let joinChar = ''
  while (functions.includes(functionName.join(joinChar))) {
    functionName[1] = nameIndex
    nameIndex += 1
    joinChar = '_'
  }
  result.exportAs = functionName.join(joinChar)
  result.exports.functions.push(result.exportAs)

  // Handle export default
  if (namedExport || defaultExported) {
    result.namedExport = true
  } else {
    result.namedExport = false // In other words "default export"
    result.exports.defaultExported = true
  }
}

module.exports = exportAs
