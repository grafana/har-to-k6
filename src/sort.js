function firstElement(a, b) {
  return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0
}

function index(a, b) {
  return a.index > b.index ? 1 : a.index < b.index ? -1 : 0
}

function value(a, b) {
  return a.value > b.value ? 1 : a.value < b.value ? -1 : 0
}

module.exports = {
  firstElement,
  index,
  value,
}
