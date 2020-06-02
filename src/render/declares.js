function declares(spec) {
  if (spec.size) {
    const content = [...spec].sort().join(`, `)
    return `let ${content};`
  } else {
    return null
  }
}

module.exports = declares
