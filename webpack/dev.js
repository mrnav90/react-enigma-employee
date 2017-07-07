import Webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import Path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv';

Dotenv.config();

module.exports = {
  output: {
    filename: 'main.js',
    path: Path.join(__dirname, '../dist'),
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
        ]
      }
    ]
  },
  plugins: [
    new Webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new Webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_URL)
    }),
    new ExtractTextPlugin('style.css'),
    new Webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {from: Path.join(__dirname, '../index.html'), to: Path.join(__dirname, '../dist/index.html')},
      {from: Path.join(__dirname, '../assets'), to: Path.join(__dirname, '../dist/assets')}
    ])
  ]
};
