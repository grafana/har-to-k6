const sleep = require('./sleep')

function pageName(node) {
  const nameParts = []

  if (node.name) {
    nameParts.push(node.name)
  } else if (node.id) {
    nameParts.push(node.id)
  }

  if (node.title) {
    nameParts.push(node.title)
  }

  return nameParts.join(' - ')
}

function page(node, result) {
  const spec = {
    name: pageName(node),
  }

  if (node.comment) {
    spec.comment = node.comment
  }

  if (node.sleep) {
    spec.sleep = sleep(node.sleep)
  }

  result.pages.set(node.id, spec)
}

module.exports = page
