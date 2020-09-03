const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

/** @type {import('webpack').Configuration } */
module.exports = {
  entry: './src/index.js',
  node: { fs: 'empty' },
  mode: 'production',
  output: {
    path: path.resolve(__dirname),
    filename: './dist/standalone.js',
    library: 'harToK6',
    libraryTarget: 'umd',
  },
  plugins: [
    process.env.BUNDLE_ANALYSIS &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: path.join(__dirname, process.env.BUNDLE_ANALYSIS),
      }),
  ].filter((a) => a),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
