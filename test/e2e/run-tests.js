const test = require('ava')
const fs = require('fs')
const path = require('path')

const convert = require('convert')

const listEntries = (dir) => fs.readdirSync(dir, { withFileTypes: true })

const listFiles = (dir, ext = '.har') =>
  listEntries(dir).filter((f) => f.isFile() && path.extname(f.name) === ext)

const findTests = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let files = []

  for (let folder of entries) {
    if (folder.isFile()) {
      continue
    }

    const childDir = path.join(dir, folder.name)

    if (folder.name === 'pass' || folder.name === 'fail') {
      files = files.concat(
        listFiles(childDir).map((f) => ({
          type: folder.name,
          name: path.relative(__dirname, path.join(childDir, f.name)),
          input: path.join(childDir, f.name),
          expected: path.join(childDir, f.name.replace('.har', '.js')),
        }))
      )

      continue
    }

    files = files.concat(findTests(childDir))
  }

  return files
}

const pass = (expectedFile, inputFile) => async (t) => {
  const input = JSON.parse(fs.readFileSync(inputFile).toString())
  const expected = fs.readFileSync(expectedFile).toString()

  const { main: result } = await convert(input)

  t.is(expected, result)
}

const fail = (inputFile) => async (t) => {
  const input = fs.readFileSync(inputFile)

  t.throws(async () => await convert(input))
}

findTests(__dirname).forEach(({ type, name, expected, input }) => {
  test(name, type === 'pass' ? pass(expected, input) : fail(expected, input))
})
