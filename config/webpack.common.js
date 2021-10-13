const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '../', dir);
}

module.exports = {
  entry: {
    index: resolve('src/main.tsx'),
  },
  output: {
    path: resolve('dist'),
    filename: 'js/[name].bundle.js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.less', '....'],
    alias: {
      '@': resolve('src'),
      '@com': resolve('src/components'),
      '@assets': resolve('src/assets'),
    },
  },

  optimization: {
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendor', // chunk 名称
          priority: 1, // 权限更高，优先抽离，重要！！！
          test: /node_modules/, // 模块的路径
          minSize: 0, // 大小限制
          minChunks: 1, // 最少复用过几次，只要命中一次，就把他作为单独的模块
          chunks: 'initial',
        },
        // 公共的模块
        common: {
          name: 'common', // chunk 名称
          priority: 0, // 优先级
          minSize: 0, // 公共模块的大小限制
          minChunks: 2, // 公共模块最少复用过几次，引用两次及以上，把公共模块拆分
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /(\.jsx|\.js|\.tsx|\.ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 开启 babel-loader 持久化缓存功能
              exclude: /node_modules/,
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /(\.c|\.le)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.scss$/,
        exclude: [resolve('src/styles')],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '_[local]_[hash:base64:5]',
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: [resolve('src/styles')],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        parser: {
          // 转base64条件
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          // 与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
          filename: 'images/[name].[hash:6][ext]',
          publicPath: '/',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              severityError: 'warning',
              // filename: "img/[name]",
              deleteOriginalAssets: true,
              minimizerOptions: {
                plugins: ['gifsicle', 'mozjpeg', 'pngquant'],
              },
              filter: (source) => {
                if (source.byteLength < 8 * 1024) {
                  // 小于8Kb不优化
                  return false;
                }
                return true;
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack-react',
      filename: 'index.html',
      template: 'public/index.html',
      favicon: path.resolve('./public/favicon.ico'),
      chunks: ['index', 'vendor', 'common'], // 要考虑代码分割
    }),
    // 抽取 css 文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new WebpackBar({ color: 'purple' }),
  ],
};
