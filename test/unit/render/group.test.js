import test from 'ava'
import isolate from 'helper/isolate'
import { FlowItemType } from 'enum'
const [group, { block, comment, entries, string }] = isolate(
  test,
  'render/group',
  {
    block: 'render/block',
    comment: 'render/comment',
    entries: 'render/entries',
    string: 'render/string',
  }
)

test.serial('empty', (t) => {
  string.returns('"page1"')
  entries.returns(null)
  block.returns(`{}`)
  const result = group({
    type: FlowItemType.Group,
    id: 'page1',
    entries: [],
  })
  t.is(result, `group("page1", function() {});`)
  t.true(entries.calledOnce)
  t.true(block.calledOnce)
})

test.serial('implicit', (t) => {
  string.returns('"page1"')
  entries.returns(`// Entries`)
  block.returns(`{
  // Entries
}`)
  const result = group({
    type: FlowItemType.Group,
    id: 'page1',
    entries: [{}],
  })
  t.is(
    result,
    `group("page1", function() {
  // Entries
});`
  )
  t.true(entries.calledOnce)
  t.true(block.calledOnce)
})

test.serial('explicit', (t) => {
  string.returns('"Page 1"')
  entries.returns(`// Entries`)
  block.returns(`{
  // Entries
}`)
  const result = group({
    type: FlowItemType.Group,
    id: 'page1',
    entries: [{}],
    page: { name: 'Page 1' },
  })
  t.is(
    result,
    `group("Page 1", function() {
  // Entries
});`
  )
})

test.serial('comment', (t) => {
  string.returns('"Page 1"')
  entries.returns(`// Entries`)
  block.returns(`{
  // Entries
}`)
  comment.returns(`// Member section`)
  const result = group({
    type: FlowItemType.Group,
    id: 'page1',
    entries: [{}],
    page: { name: 'Page 1', comment: 'Member section' },
  })
  t.is(
    result,
    `// Member section
group("Page 1", function() {
  // Entries
});`
  )
})
