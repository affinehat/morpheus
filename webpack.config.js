const path = require('path')
const webpack = require('webpack')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const root = path.resolve(__dirname)

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    plugins: [ PnpWebpackPlugin ],
    alias: {
      api: `${root}/src/api`,
      components: `${root}/src/components`,
      editor: `${root}/src/editor`,
      info: `${root}/src/info-panel`,
    },
  },
  resolveLoader: {
    plugins: [
      PnpWebpackPlugin.moduleLoader(module),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/assets/',
    filename: 'bundle.js',
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, 'public'),
    hotOnly: true,
  },
}
