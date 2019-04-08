const VariableType = Object.freeze({
  JSONPath: 0,
  Regex: 1
})
const VariableTypeEncoding = inverse(VariableType)

function inverse (items) {
  const map = new Map()
  for (const key of Object.keys(items)) {
    const encoding = items[key]
    if (map.has(encoding)) {
      throw new Error('Duplicate enum item encoding')
    }
    map.set(encoding, key)
  }
  return map
}

Object.assign(exports, {
  VariableType,
  VariableTypeEncoding
})
