const test = require('ava')
const fs = require('fs')
const path = require('path')

const convert = require('convert')
const { parse } = require('../../helper/parse')

function loadHAR(relativeFilename) {
  const har = fs
    .readFileSync(path.resolve(__dirname, relativeFilename))
    .toString()
  return JSON.parse(har)
}

// Useful for when test fails (use diffing tool to check what the actual diff is)
// Usage: write(main, path.resolve(__dirname, expectedFile))
// function write(main, expectedFile) {
//   fs.writeFileSync(`actual_${path.basename(expectedFile)}`, main)
// }

async function testConvert(input, expectedFile) {
  const { main } = await convert(input)
  const result = parse(main)

  // Load expected content
  const expected = parse(
    fs.readFileSync(path.resolve(__dirname, expectedFile)).toString()
  )

  return [result, expected, main]
}

test('with export props', async t => {
  const input = [
    loadHAR('./with-export-props-1.har'),
    loadHAR('./with-export-props-2.har'),
  ]
  const [result, expected] = await testConvert(
    input,
    './with-export-props.expected.js'
  )

  t.deepEqual(result, expected)
})

test('no export props', async t => {
  const input = [
    loadHAR('./no-export-props.har'),
    loadHAR('./no-export-props.har'),
  ]
  const [result, expected] = await testConvert(
    input,
    './no-export-props.expected.js'
  )

  t.deepEqual(result, expected)
})
