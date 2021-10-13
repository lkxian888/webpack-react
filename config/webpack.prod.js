const { merge } = require('webpack-merge');
const commonWebpackConfig = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 该插件使用 terser 来压缩 JavaScript
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(commonWebpackConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map', // 修改了这里，这能大大压缩我们的打包代码
  stats: 'errors-only',
  // performance: {
  //   // hints: false,
  //   maxEntrypointSize: 400000, // 默认值是：250000 (bytes)
  // },
  optimization: {
    minimize: true,
    minimizer: [
      `...`,
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          keepClassnames: true,
          keepFnames: true,
          output: {
            ecma: 5,
            comments: false,
            asciiOnly: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new friendlyErrorsWebpackPlugin({
      // 成功的时候输出
      compilationSuccessInfo: {
        messages: [`打包成功！！！`],
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

    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: 8889,
    //   reportFilename: 'report.html',
    //   defaultSizes: 'parsed',
    //   openAnalyzer: true,
    //   generateStatsFile: false,
    //   statsFilename: 'stats.json',
    //   statsOptions: null,
    //   logLevel: 'info',
    // }),
  ],
});
