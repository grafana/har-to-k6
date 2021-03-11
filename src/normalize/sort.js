function sortStartDateTimeString(nodeA, nodeB) {
  const dateA = new Date(nodeA.startedDateTime)
  const dateB = new Date(nodeB.startedDateTime)

  return dateA - dateB
}

function sortStartDateTimeDate(nodeA, nodeB) {
  return nodeA.startedDateTime - nodeB.startedDateTime
}

module.exports = {
  sortStartDateTimeString,
  sortStartDateTimeDate,
}
