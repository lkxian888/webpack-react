const path = require('path');
const { merge } = require('webpack-merge');
const commonWebpackConfig = require('./webpack.common');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');

module.exports = merge(commonWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'errors-only',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    open: true,
    host: process.env.HOST || '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 3000,
    hot: true,
    historyApiFallback: true, // 所有的404都到index.html
    proxy: {
      '/api': {
        target: 'http://baidu.com',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new friendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:3000`],
        notes: ['Some additional notes to be displayed upon successful compilation'],
      },
      // 每次都清空控制台
      clearConsole: true,
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: 'Webpack error',
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
        });
      },
    }),
  ],
  cache: {
    type: 'filesystem', // 开启持久缓存
    allowCollectingMemory: true,
    cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/webpack'),
  },
  // watch: true,
  // watchOptions: {
  //   aggregateTimeout: 6000,
  //   ignored: ['**/node_modules'],
  // },
});
