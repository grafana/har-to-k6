const fs = require('fs')
const tmp = require('tmp')

async function stage(index) {
  const [dir, cleanup] = await directory()
  try {
    await stageModules(dir)
    const path = `${dir}/index.js`
    await stageIndex(path, index)
    return [path, cleanup]
  } finally {
    cleanup()
  }
}

async function directory() {
  return new Promise((resolve, reject) => {
    tmp.dir((error, path, cleanup) => {
      if (error) {
        reject(error)
      } else {
        resolve([path, cleanup])
      }
    })
  })
}

async function stageModules(dir) {
  return new Promise((resolve, reject) => {
    const target = `${__dirname}/../../node_modules`
    fs.symlink(target, `${dir}/node_modules`, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

async function stageIndex(path, index) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, index, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

module.exports = stage
