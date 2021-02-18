const note = require('../../../note/map')
const comment = require('../../../comment')

function fixed(spec) {
  return [description(spec.post.params), `formData.body()`]
    .filter((item) => item)
    .join(`\n`)
}

function description(params) {
  const content = note(params)
  if (content) {
    return comment(content)
  } else {
    return null
  }
}

module.exports = fixed
