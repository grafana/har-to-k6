const sleep = require('./sleep')
const comment = require('./comment')

// If no entries specifies sleep we set a minimum 1s sleep as last step in main function
function defaultSleep(spec) {
  if (
    (spec.entries && spec.entries.find((entry) => entry.sleep)) ||
    (spec.pages && Array.from(spec.pages.values()).find((page) => page.sleep))
  ) {
    return null
  }

  return [comment('Automatically added sleep'), sleep(1000)].join('\n')
}

module.exports = defaultSleep
