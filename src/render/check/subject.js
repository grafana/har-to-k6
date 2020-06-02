const { CheckSubject } = require('../../enum')
const { UnrecognizedError } = require('../../error')

function subject(value) {
  switch (value) {
    case CheckSubject.ResponseBody:
      return `response.body`
    case CheckSubject.HttpStatusCode:
      return `response.status.toString()`
    case CheckSubject.ResponseHeaders:
      return (
        '' +
        `Object.entries(response.headers)
  .map((key, value) => key + ': ' + value)`
      )
    default:
      throw new UnrecognizedError(
        { name: 'UnrecognizedCheckSubject' },
        `Unrecognized check subject: ${value}`
      )
  }
}

module.exports = subject
