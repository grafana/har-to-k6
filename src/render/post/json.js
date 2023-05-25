function json(spec) {
  return `JSON.stringify(${Array.from(spec.post.params.keys())[0] || '{}'})`
}

module.exports = json
