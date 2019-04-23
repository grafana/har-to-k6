const browserify = require('browserify')
const fs = require('fs')
const indent = require('../render/indent')
const string = require('../render/string')
const tinyify = require('tinyify')
const tmp = require('tmp')

async function compat ({ imports }) {
  if (any(imports)) {
    const addend = analyze(imports)
    const entry = index(addend)
    const [ dir, cleanup ] = await directory()
    try {
      await stageModules(dir)
      await stageIndex(dir, entry)
      return bundle(dir)
    } finally {
      cleanup()
    }
  } else {
    return null
  }
}

function any (imports) {
  return (
    imports.jsonpath ||
    imports.formUrlEncode ||
    imports.MimeBuilder
  )
}

function analyze (imports) {
  return {
    direct: direct(imports),
    indirect: indirect(imports)
  }
}

function direct (imports) {
  const addend = new Map()
  if (imports.jsonpath) {
    addend.set('jsonpath', 'jsonpath')
  }
  return addend
}

function indirect (imports) {
  const addend = new Map()
  if (imports.formUrlEncode) {
    addend.set('formUrlEncode', 'form-urlencode')
  }
  if (imports.MimeBuilder) {
    addend.set('MimeBuilder', 'emailjs-mime-builder')
  }
  return addend
}

function index (addend) {
  const entries = []
  for (const [ expose, name ] of addend.direct) {
    entries.push(`${expose}: require(${string(name)})`)
  }
  for (const [ expose, name ] of addend.indirect) {
    entries.push(`${expose}: require(${string(name)}).default`)
  }
  const content = entries.join(`,\n`)
  return '' +
`Object.assign(exports, {
${indent(content)}
})`
}

async function directory () {
  return new Promise((resolve, reject) => {
    tmp.dir((error, path, cleanup) => {
      if (error) {
        reject(error)
      } else {
        resolve([ path, cleanup ])
      }
    })
  })
}

async function stageModules (dir) {
  return new Promise((resolve, reject) => {
    const target = `${__dirname}/../../node_modules`
    fs.symlink(target, `${dir}/node_modules`, error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

async function stageIndex (dir, index) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${dir}/index.js`, index, error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

async function bundle (dir) {
  return new Promise((resolve, reject) => {
    const bundler = browserify(`${dir}/index.js`, { standalone: 'Compat' })
    bundler.plugin(tinyify, { flat: false })
    bundler.bundle((error, buffer) => {
      if (error) {
        reject(error)
      } else {
        const string = buffer.toString('utf8')
        resolve(string)
      }
    })
  })
}

module.exports = compat
