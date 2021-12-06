/**
 * Uppercase first character (capitalize)
 * @param {string} subject
 * @returns {string}
 */
function capitalize(subject) {
  return typeof subject === 'string' && subject.length > 0
    ? `${subject.charAt(0).toUpperCase()}${subject.toLowerCase().slice(1)}`
    : ''
}

module.exports = capitalize
