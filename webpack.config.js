const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const pages = [
  { pageName: 'page1' },
];

const pluginsOptions = [];
pages.forEach((page) => {
  pluginsOptions.push(
    new HtmlWebpackPlugin({
      filename: `./${page.pageName}.html`,
      template: `./src/pages/${page.pageName}/${page.pageName}.pug`,
      inject: true,
      chunks: [page.pageName],
    }),
  );
});
pluginsOptions.push(new HtmlWebpackPlugin({
  filename: './index.html',
  template: './src/pages/index/index.pug',
  inject: true,
  chunks: ['index'],
}));
pluginsOptions.push(new MiniCssExtractPlugin({
  filename: '[name].css',
}));
pluginsOptions.push(new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
}));

const entries = pages.reduce((obj, curEntry) => {
  obj[curEntry.pageName] = `./src/pages/${curEntry.pageName}/${curEntry.pageName}.js`;
  return obj;
}, {});
/* entries.favicon = './src/favicons/favicons.js'; */
entries.index = './src/pages/index/index.js';

module.exports = {
  entry: entries,

  output: {
    path: path.resolve(__dirname, 'bandle'),
    filename: '[name].js?v=[hash]',
  },

  plugins: pluginsOptions,

  module: {
    rules: [
      {
        test: /\.pug$/,
        loaders: [
          {
            loader: 'pug-loader',
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg|png|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.css$/,
        loaders: [
          {
            loader: 'style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          {
            loader: 'style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};