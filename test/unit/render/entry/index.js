import test from 'ava'
import isolate from 'helper/isolate'
const [ entry, { header, logic } ] =
  isolate(test, 'render/entry', {
    header: 'render/entry/header',
    logic: 'render/entry/logic'
  })

test.serial('basic', t => {
  header.returns(null)
  logic.returns(`// Logic`)
  const result = entry({})
  t.is(result, `// Logic`)
})

test.serial('header', t => {
  header.returns(`// Header`)
  logic.returns(`// Logic`)
  const result = entry({})
  t.is(result, '' +
`// Header
// Logic`)
})
