function main(spec) {
  if (spec.comment || spec.request.comment) {
    return [spec.comment, spec.request.comment].filter((item) => item).join(`\n`)
  } else {
    return null
  }
}

module.exports = main
