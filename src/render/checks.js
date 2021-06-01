const check = require('./check')

const objectProperty = (item) => [`"${item.name}"`, item.value].join(':')

function checks(spec) {
  if (spec.size) {
    const items = [...spec].map(([name, item]) => check(name, item))
    // Using dumb method of rendering the code here because we want to explicitly render ${varName}
    // instead of resolving it.
    const body = ['{', items.map(objectProperty), '}'].join('')

    return `check(response, ${body});`
  } else {
    return null
  }
}

module.exports = checks
