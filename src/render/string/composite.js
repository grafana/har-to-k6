function composite(items, delimiter = '') {
  return JSON.stringify(items.join(delimiter))
}

module.exports = composite
