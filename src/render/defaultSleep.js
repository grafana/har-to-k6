const sleep = require('./sleep')

// If no entries specifies sleep we set a minimum 1s sleep as last step in main function
function defaultSleep(spec) {
  if (
    spec.entries.find((entry) => entry.sleep) ||
    Array.from(spec.pages.values()).find((page) => page.sleep)
  ) {
    return null
  }

  return sleep(1000)
}

module.exports = defaultSleep
