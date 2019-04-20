const AddressSpecies = Object.freeze({
  /*
   * Fixed string
   *
   * Address without variable
   * No query
   */
  Fixed: 1,

  /*
   * Constructible at convert time
   *
   * Address without variable
   * Query without variable
   */
  Constructed: 2,

  /*
   * Needs simple variable resolution
   * (runtime resolution, no runtime manipulation)
   *
   * Address with inner variable
   * No query
   */
  Resolved: 3,

  /*
   * Needs runtime manipulation
   *
   * Any of:
   * - Address with variable at start
   * - Address with variable + query
   * - Query with variable
   */
  Runtime: 4
})

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

const PostSpecies = Object.freeze({
  Empty: 1,
  Unstructured: 2,
  Structured: 3
})

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
  AddressSpecies,
  CheckCondition,
  CheckConditionEncoding,
  CheckSubject,
  CheckSubjectEncoding,
  CheckType,
  CheckTypeEncoding,
  PostSpecies,
  StringSpecies,
  VariableType,
  VariableTypeEncoding
})
