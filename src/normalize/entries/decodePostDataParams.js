const { getContentTypeValue } = require('../../aid')

/**
 * Decodes `entries[x].request.postData.params` if the mimeType is equal to application/x-www-form-urlencoded
 * @param {Entry[]} entries
 * @return {Entry[]} entries
 */
function getDecodedPostDataParamEntries(entries) {
  return entries.map((entry = {}) => {
    if (!entry.request) {
      return entry
    }

    if (!entry.request.postData) {
      return entry
    }

    if (!entry.request.postData.params) {
      return entry
    }

    const mimeType = getContentTypeValue(entry.request.postData.mimeType)

    if (
      mimeType !== 'application/x-www-form-urlencoded' ||
      entry.request.postData.decoded
    ) {
      return entry
    }

    const postDataParams = entry.request.postData.params.map((param = {}) => {
      return {
        name: decodeURIComponent(param.name),
        value: decodeURIComponent(param.value),
      }
    })

    entry.request.postData.params = postDataParams
    entry.request.postData.decoded = true
    return entry
  })
}

module.exports = { getDecodedPostDataParamEntries }
