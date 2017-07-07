import WebpackDevConfig from './dev';
import WebpackProductionConfig from './production';
import Path from 'path';
import Dotenv from 'dotenv';

Dotenv.config();

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const MODULE_EXPORT = DEVELOPMENT ? WebpackDevConfig.module : WebpackProductionConfig.module;
const PLUGIN_EXPORT = DEVELOPMENT ? WebpackDevConfig.plugins : WebpackProductionConfig.plugins;
const OUTPUT_EXPORT = DEVELOPMENT ? WebpackDevConfig.output : WebpackProductionConfig.output;

const webpack = {
  entry: './src/index.js',
  output: OUTPUT_EXPORT,
  module: MODULE_EXPORT,
  plugins: PLUGIN_EXPORT,
  resolve: {
    extensions: ['*', '.jsx', '.js'],
    alias: {
      actions: Path.resolve(__dirname, '../src/actions'),
      components: Path.resolve(__dirname, '../src/components'),
      configs: Path.resolve(__dirname, '../src/configs'),
      constants: Path.resolve(__dirname, '../src/constants'),
      containers: Path.resolve(__dirname, '../src/containers'),
      reducers: Path.resolve(__dirname, '../src/reducers'),
      apis: Path.resolve(__dirname, '../src/apis'),
      utils: Path.resolve(__dirname, '../src/utils'),
      styles: Path.resolve(__dirname, '../src/styles'),
      i18n: Path.resolve(__dirname, '../i18n')
    }
  },
  stats: {
    children: false
  }
};

if (!DEVELOPMENT) {
  webpack.devtool = 'source-map';
}

module.exports = webpack;
