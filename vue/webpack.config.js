const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    hot: true,
    open: true,
  },
  module: {
    rules: [
      { test: /\.vue$/, use: ['vue-loader'] },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        // 不加有警告
        options: { appendTsSuffixTo: [/\.vue$/] },
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      templateContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Vue App</title>
</head>
<body>
  <div id="app" />
</body>
</html>
  `,
    }),
  ],
}
