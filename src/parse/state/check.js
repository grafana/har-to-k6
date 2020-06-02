const { CheckCondition, CheckSubject, CheckType } = require('../../enum')

function check(spec) {
  spec.state.negated = negated(spec)
  spec.state.plural = plural(spec)
}

/*
 * Check condition is negated.
 */
function negated(spec) {
  return spec.condition === CheckCondition.NotContains
}

/*
 * Input data is plural.
 */
function plural(spec) {
  return spec.subject === CheckSubject.ResponseHeaders || spec.type === CheckType.JSONPathValue
}

module.exports = check
