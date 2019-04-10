function firstElement (a, b) {
  return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0
}

function index (a, b) {
  return a.index > b.index ? 1 : a.index < b.index ? -1 : 0
}

Object.assign(exports, {
  firstElement,
  index
})
