const test = require('ava')
const isolate = require('helper/isolate')
const [root, { imports, lead, logic, options }] = isolate(test, 'render/root', {
  imports: 'render/imports',
  lead: 'render/lead',
  logic: 'render/logic',
  options: 'render/options',
})

test.serial('basic', t => {
  root({})
  t.true(lead.calledOnce)
  t.true(imports.calledOnce)
  t.true(options.calledOnce)
  t.true(logic.calledOnce)
})
