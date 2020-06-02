const { FlowItemType } = require('../enum')

// Resolve control flow
function flow(result) {
  const processed = new Set()
  for (const entry of result.entries) {
    item(entry, result, processed, result.flow)
  }
}

function item(entry, result, processed, items) {
  if (entry.page) {
    grouped(entry.page, result, processed, items)
  } else {
    external(entry, items)
  }
}

function external(entry, items) {
  const item = {
    type: FlowItemType.External,
    entry,
  }
  items.push(item)
}

function grouped(page, result, processed, items) {
  if (!processed.has(page)) {
    processed.add(page)
    const entries = result.entries.filter((entry) => entry.page === page)
    const item = {
      type: FlowItemType.Group,
      id: page,
      entries,
    }
    if (result.pages.has(page)) {
      item.page = result.pages.get(page)
    }
    items.push(item)
  }
}

module.exports = flow
