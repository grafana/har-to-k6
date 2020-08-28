const { empty } = require('../aid')
const { InvalidArchiveError } = require('../error')

/*
 * name: required string
 * value: optional string
 * fileName: optional string
 * contentType: optional string
 * comment: optional string
 */
function param(node, i, j) {
  validate(node, i, j)
}

function validate(node, i, j) {
  if (empty(node.name)) {
    console.warn(`[WARN] Discarding param with missing name (${i}:${j})`)
  }
  if (typeof node.name !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidParamName' },
      `Invalid param name (${i}:${j}): must be string`
    )
  }
  if (node.value && typeof node.value !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidParamValue' },
      `Invalid param value (${i}:${j}): must be string`
    )
  }
  if (node.fileName && typeof node.fileName !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidParamFileName' },
      `Invalid param file name (${i}:${j}): must be string`
    )
  }
  if (node.contentType && typeof node.contentType !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidParamType' },
      `Invalid param content type (${i}:${j}): must be string`
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidComment' },
      `Invalid param comment (${i}:${j}): must be string`
    )
  }
}

module.exports = param
