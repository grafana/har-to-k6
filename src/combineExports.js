function combineExports(results) {
  if (results.length <= 1) {
    return
  }

  const functionNames = []
  let defaultExported = false
  let nameIndex = ''

  for (const result of results) {
    // Force `false` if default has already been exported
    result.defaultExport = !defaultExported ? result.defaultExport : false
    // Once true, remains true for the remaining iterations
    defaultExported = defaultExported ? defaultExported : result.defaultExport
    const { exportAs } = result
    while (functionNames.includes(`${exportAs}${nameIndex}`)) {
      nameIndex = nameIndex === '' ? 0 : nameIndex + 1
    }

    // Store exported name
    functionNames.push(`${exportAs}${nameIndex}`)

    // Use last stored name
    result.exportAs = functionNames.slice(-1)[0]
  }
}

module.exports = combineExports
