function options(result) {
  const obj = {
    ...result.options,
  }

  return `export const options = ${JSON.stringify(obj)};`
}

module.exports = options
