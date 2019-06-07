#!/usr/bin/env node

const bundle = require('../src/build/bundle')
const fs = require('fs-extra')

;(async () => {
  fs.ensureDirSync('build')
  const result = await bundle('.', 'harToK6')
  outputResult(result)
})()

function outputResult (result) {
  fs.writeFileSync('build/har-to-k6.js', result)
}
