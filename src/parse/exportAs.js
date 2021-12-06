const strToFunctionName = require('../helpers/strToFunctionName')

function exportAs(value = '', result) {
  const strValue = String(value)
  if (strValue !== '') {
    result.defaultExport = false
  }

  result.exportAs = strToFunctionName(strValue)
}

module.exports = exportAs
