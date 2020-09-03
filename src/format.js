const date = {
  http(time) {
    return time.format('ddd, DD MMM YYYY HH:mm:ss [GMT]')
  },
  iso8601(time) {
    return time.format()
  },
}

module.exports = {
  date,
}
