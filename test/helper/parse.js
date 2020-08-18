const acorn = require('acorn')

const ignoreLocationProps = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(ignoreLocationProps)
  }

  let result = {}

  for (let [key, value] of Object.entries(obj)) {
    switch (key) {
      case 'start':
      case 'end':
      case 'loc':
      case 'range':
        break

      default:
        result[key] = ignoreLocationProps(value)
        break
    }
  }

  return result
}

/**
 * Parses the generated output to verify that it's valid JS, filters away some
 * source code dependent properties to allow deep equality assertions between
 * parsed ASTs.
 */
exports.parse = (src) => ignoreLocationProps(acorn.parse(src.value || src))
