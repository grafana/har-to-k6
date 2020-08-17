const { js, from } = require('../../../codegen')

const template = js`
  response => jsonpath.query(response.json(), ${from('expression')}).length > 0
`

function JSONPath(name, { comment, expression }) {
  return {
    name,
    comment,
    value: template({ expression }),
  }
}

module.exports = JSONPath
