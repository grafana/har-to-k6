const path = require('path');

module.exports = {
  entry: './src/index.js',
  node: { fs: 'empty' },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'har-to-k6.js',
    library: 'harToK6',
    libraryTarget: 'umd'
  }
};