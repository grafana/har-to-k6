const { CheckSubject } = require('../../enum')
const { UnrecognizedError } = require('../../error')

function subject(value) {
  switch (value) {
    case CheckSubject.ResponseBody:
      return 'body'
    case CheckSubject.ResponseHeaders:
      return 'header'
    case CheckSubject.HttpStatusCode:
      return 'status'
    default:
      throw new UnrecognizedError(
        { name: 'UnrecognizedCheckSubject' },
        `Unrecognized check subject: ${value}`
      )
  }
}

module.exports = subject
