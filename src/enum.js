const AddressSpecies = {
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
  Runtime: 4,
}

const SleepPlacement = {
  Before: 'before',
  After: 'after',
}

const CheckCondition = {
  Contains: 0,
  NotContains: 1,
  Equals: 2,
  StartsWith: 3,
  EndsWith: 4,
  TypeOf: 5,
}

const CheckConditionEncoding = inverse(CheckCondition)

const CheckSubject = {
  ResponseBody: 0,
  ResponseHeaders: 1,
  HttpStatusCode: 2,
}
const CheckSubjectEncoding = inverse(CheckSubject)

const CheckType = {
  Text: 0,
  JSONPathValue: 1,
  JSONPath: 2,
  Regex: 3,
}
const CheckTypeEncoding = inverse(CheckType)

const TypeOfOptions = {
  String: 'string',
  Number: 'number',
  Boolean: 'boolean',
  Object: 'object',
  Array: 'array',
  Null: 'null',
}

const CommentLocation = {
  Top: 0,
  Suffix: 1,
}

const FlowItemType = {
  External: 0,
  Group: 1,
}

const PostSpecies = {
  Empty: 1,
  Unstructured: 2,
  Structured: 3,
}

const StringSpecies = {
  Identifier: 0,
  String: 1,
  Template: 2,
}

const VariableType = {
  JSONPath: 0,
  Regex: 1,
  CSSSelector: 2,
}
const VariableTypeEncoding = inverse(VariableType)

function inverse(items) {
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

module.exports = {
  AddressSpecies,
  SleepPlacement,
  CheckCondition,
  CheckConditionEncoding,
  CheckSubject,
  CheckSubjectEncoding,
  CheckType,
  CheckTypeEncoding,
  CommentLocation,
  FlowItemType,
  PostSpecies,
  StringSpecies,
  VariableType,
  VariableTypeEncoding,
  TypeOfOptions,
}
