module.exports = {
  ...require('./error'),
  liHARToK6Script: require('./convert'),
  validate: require('./validate'),
  addSleepToHAR: require('./addSleep'),
}
