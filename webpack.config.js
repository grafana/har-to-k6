const path = require('path')

module.exports = {
  entry: './src/index.js',
  node: { fs: 'empty' },
  mode: 'production',
  output: {
    path: path.resolve(__dirname),
    filename: 'standalone.js',
    library: 'harToK6',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
