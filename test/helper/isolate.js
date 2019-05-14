const mockRequire = require('mock-require')
const sinon = require('sinon')

function isolate (test, unit, external) {
  const stubs = {}
  for (const name of Object.keys(external)) {
    const path = external[name]
    const stub = sinon.stub()
    mockRequire(`../../src/${path}`, stub)
    stubs[name] = stub
  }
  test.afterEach.always(t => {
    for (const key of Object.keys(stubs)) {
      stubs[key].reset()
    }
  })
  const isolated = require(unit)
  return [ isolated, stubs ]
}

module.exports = isolate
