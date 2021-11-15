function combineImports(results) {
  const [main = {}] = results
  const imports = { ...(main.imports || {}) }

  if (results.length > 1) {
    for (const result of results) {
      Object.entries(result.imports || {}).forEach(([key, value]) => {
        if (value === true || imports[key] === undefined) {
          imports[key] = value
        }
      })
    }
  }

  return imports
}

module.exports = combineImports
