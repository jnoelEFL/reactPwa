const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const srcDir = resolve(__dirname, 'src')

module.exports = {
  entry: `${srcDir}/index.js`,
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    sourceMapFilename: '[file].map'
  },
  devServer: {
    historyApiFallback: true,
    port:1234
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      use: 'standard-loader',
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(css|styl)$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: ['css-loader?sourceMap,modules,localIdentName="[name]-[local]-[hash:base64:6]"', 'stylus-loader']
      })
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${srcDir}/index.html`
    }),
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
    new DashboardPlugin()
  ]
}
