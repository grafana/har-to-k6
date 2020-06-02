const bundle = require('./bundle')
const stage = require('./stage')

// Bundle a constructed index
// Stages to a temporary directory then bundles
async function constructed(index, expose) {
  const [path, cleanup] = await stage(index)
  try {
    return bundle(path, expose)
  } finally {
    cleanup()
  }
}

module.exports = constructed
