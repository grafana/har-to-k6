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

    if (entry.request.method !== 'POST' || !entry.request.postData) {
      return entry
    }

    if (
      entry.request.postData.mimeType !== 'application/x-www-form-urlencoded' ||
      !entry.request.postData.params
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
    return entry
  })
}

module.exports = { getDecodedPostDataParamEntries }
