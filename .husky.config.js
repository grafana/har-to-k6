const tasks = arr => arr.join(' %% ');

module.exports = {
  'hooks': {
    'pre-push': tasks([
      'yarn lint-js',
      'yarn test',
    ]),
  },
};
