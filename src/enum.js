const CheckCondition = Object.freeze({
  Contains: 0,
  NotContains: 1,
  Equals: 2,
  StartsWith: 3,
  EndsWith: 4
})
const CheckConditionEncoding = inverse(CheckCondition)

const CheckSubject = Object.freeze({
  ResponseBody: 0,
  ResponseHeaders: 1,
  HttpStatusCode: 2
})
const CheckSubjectEncoding = inverse(CheckSubject)

const CheckType = Object.freeze({
  Text: 0,
  JSONPathValue: 1,
  JSONPath: 2,
  Regex: 3
})
const CheckTypeEncoding = inverse(CheckType)

const StringSpecies = Object.freeze({
  Identifier: 0,
  String: 1,
  Template: 2
})

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
  CheckCondition,
  CheckConditionEncoding,
  CheckSubject,
  CheckSubjectEncoding,
  CheckType,
  CheckTypeEncoding,
  StringSpecies,
  VariableType,
  VariableTypeEncoding
})
