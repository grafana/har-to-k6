import test from 'ava'
import isolate from 'helper/isolate'
const [ root, { imports, logic, options } ] =
  isolate(test, 'render/root', {
    imports: 'render/imports',
    logic: 'render/logic',
    options: 'render/options'
  })

test.serial('basic', t => {
  root({})
  t.true(imports.calledOnce)
  t.true(options.calledOnce)
  t.true(logic.calledOnce)
})
