#!/usr/bin/env node

const bundle = require('../src/build/bundle')
const constructed = require('../src/build/constructed')
const entry = require('../src/build/entry')
const fs = require('fs-extra')

;(async () => {
  fs.ensureDirSync('build')
  const compats = await buildCompats()
  outputCompats(compats)
  const result = await bundle('.', 'harToK6')
  outputResult(result)
})()

/*
 * Indexed with bitmask:
 *   0: jsonpath
 *   1: form-urlencoded
 *   2: emailjs-mime-builder
 */
async function buildCompats () {
  return {
    0b001: await constructed(entry({
      direct: new Map()
        .set('jsonpath', 'jsonpath')
    })),
    0b010: await constructed(entry({
      indirect: new Map()
        .set('formUrlEncode', 'form-urlencoded')
    })),
    0b100: await constructed(entry({
      indirect: new Map()
        .set('MimeBuilder', 'emailjs-mime-builder')
    })),
    0b011: await constructed(entry({
      direct: new Map()
        .set('jsonpath', 'jsonpath'),
      indirect: new Map()
        .set('formUrlEncode', 'form-urlencoded')
    })),
    0b101: await constructed(entry({
      direct: new Map()
        .set('jsonpath', 'jsonpath'),
      indirect: new Map()
        .set('MimeBuilder', 'emailjs-mime-builder')
    })),
    0b110: await constructed(entry({
      indirect: new Map()
        .set('formUrlEncode', 'form-urlencoded')
        .set('MimeBuilder', 'emailjs-mime-builder')
    })),
    0b111: await constructed(entry({
      direct: new Map()
        .set('jsonpath', 'jsonpath'),
      indirect: new Map()
        .set('formUrlEncode', 'form-urlencoded')
        .set('MimeBuilder', 'emailjs-mime-builder')
    }))
  }
}

function outputCompats (compats) {
  const rendered = renderCompats(compats)
  fs.writeFileSync('build/compats.js', rendered)
}

function renderCompats (compats) {
  const string = JSON.stringify(compats)
  return `module.exports = ${string}`
}

function outputResult (result) {
  fs.writeFileSync('build/har-to-k6.js', result)
}
