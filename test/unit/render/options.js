import test from 'ava'
import prettify from 'render/prettify'
import options from 'render/options'

test('basic', t => {
  const result = options({
    options: {}
  })

  t.is(
    prettify(result),
    prettify(`export const options = {}`)
  )
})

test('vus + duration', t => {
  const result = options({
    options: {
      duration: '10s',
      vus: 100
    }
  })

  t.is(
    prettify(result),
    prettify(`export const options = { "duration": "10s", "vus": 100 }`)
  )
})

test('advanced', t => {
  const result = options({
    options: {
      stages: [
        { duration: '10s', target: 1 },
        { duration: '20s', target: 2 },
        { duration: '10s', target: 0 }
      ]
    }
  })

  t.is(
    prettify(result),
    prettify(`export const options = {
      "stages": [
        { "duration": "10s", "target": 1 },
        { "duration": "20s", "target": 2 },
        { "duration": "10s", "target": 0 },
      ]
    }`)
  )
})
