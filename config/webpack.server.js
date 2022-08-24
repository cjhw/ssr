const path = require('path')
const webpackExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  mode: (process.env.NODE_ENV = 'production' ? 'production' : 'development'),
  entry: path.resolve(__dirname, '../src/server.js'),
  output: {
    filename: 'bundle_server.js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  // 不打包node_modules
  externals: [webpackExternals()],
}
