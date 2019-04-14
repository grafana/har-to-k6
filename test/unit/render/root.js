import test from 'ava'
import isolate from 'helper/isolate'
const [ root, { header, imports, logic, options } ] =
  isolate(test, 'render/root', {
    header: 'render/header',
    imports: 'render/imports',
    logic: 'render/logic',
    options: 'render/options'
  })

test.serial('basic', t => {
  root({})
  t.true(header.calledOnce)
  t.true(imports.calledOnce)
  t.true(options.calledOnce)
  t.true(logic.calledOnce)
})
