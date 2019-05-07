const browserify = require('browserify')
const fs = require('fs')
const tinyify = require('tinyify')
const tmp = require('tmp')

async function bundle (index) {
  const [ dir, cleanup ] = await directory()
  try {
    await stageModules(dir)
    await stageIndex(dir, index)
    return execute(dir)
  } finally {
    cleanup()
  }
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

async function execute (dir) {
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

module.exports = bundle
