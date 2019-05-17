function options (result) {
  const obj = {};

  for (const [key, value] of result.options) {
    obj[key] = value
  }

  return `export const options = ${JSON.stringify(obj)}`;
}


module.exports = options
