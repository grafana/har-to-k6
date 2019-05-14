import test from 'ava'
import isolate from 'helper/isolate'
const [ pre, { comment, text } ] =
  isolate(test, 'render/post/multipart/resolved/pre', {
    comment: 'render/comment',
    text: 'render/text'
  })

test.serial('minimal', t => {
  text.onFirstCall().returns('"form-data; name=search"')
  text.onSecondCall().returns('""')
  const params = new Map().set('search', new Set([ {} ]))
  const result = pre(params)
  t.is(result, '' +
`body = new MimeBuilder("multipart/form-data");
body.createChild()
  .setHeader("Content-Disposition", "form-data; name=search")
  .setContent("");`)
})

test.serial('3', t => {
  text.callsFake(value => JSON.stringify(value))
  const params = new Map()
    .set('search', new Set([ { value: 'kitten' } ]))
    .set('filter', new Set([ { value: 'cute' } ]))
    .set('order', new Set([ { value: 'cuteness' } ]))
  const result = pre(params)
  t.is(result, '' +
`body = new MimeBuilder("multipart/form-data");
body.createChild()
  .setHeader("Content-Disposition", "form-data; name=search")
  .setContent("kitten");
body.createChild()
  .setHeader("Content-Disposition", "form-data; name=filter")
  .setContent("cute");
body.createChild()
  .setHeader("Content-Disposition", "form-data; name=order")
  .setContent("cuteness");`)
})

test.serial('file', t => {
  text.callsFake(value => JSON.stringify(value))
  const params = new Map()
    .set('data', new Set([ {
      value: 'first,second,third\none,two,three',
      contentType: 'text/csv',
      fileName: 'data.csv'
    } ]))
  const result = pre(params)
  t.is(result, '' +
`body = new MimeBuilder("multipart/form-data");
body.createChild("text/csv", { filename: "data.csv" })
  .setHeader("Content-Disposition", "form-data; name=data")
  .setContent("first,second,third\\none,two,three");`)
})

test.serial('comment', t => {
  text.callsFake(value => JSON.stringify(value))
  comment.returns(`// Find kittens`)
  const params = new Map()
    .set('search', new Set([ { value: 'kitten', comment: 'Find kittens' } ]))
  const result = pre(params)
  t.is(result, '' +
`body = new MimeBuilder("multipart/form-data");
// Find kittens
body.createChild()
  .setHeader("Content-Disposition", "form-data; name=search")
  .setContent("kitten");`)
})
