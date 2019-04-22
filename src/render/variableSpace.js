function variableSpace (result) {
  if (result.flow.find(variableGroup)) {
    return `const vars = {};`
  } else {
    return null
  }
}

function variableGroup (group) {
  return group.entries.find(variableEntry)
}

function variableEntry (entry) {
  return entry.variables.size
}

module.exports = variableSpace
