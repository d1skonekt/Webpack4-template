const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');




const PATHS = {
  src: path.join(__dirname, './../src'),
  build: path.join(__dirname, './../build'),
  assets: 'assets/'
}

module.exports = {

  externals: {
    paths: PATHS
  },

  entry: {
    app: `${PATHS.src}/js/main.js`
  },
  output: {
    path: PATHS.build,
    filename: 'js/[name]-[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/env']
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./images/",
              useRelativePath: true
            }
          },
          {
            loader: 'img-loader',
            options: {
              plugins: [
                require('imagemin-gifsicle')({
                  interlaced: false
                }),
                require('imagemin-mozjpeg')({
                  progressive: true,
                  arithmetic: false
                }),
                require('imagemin-pngquant')({
                  floyd: 0.5,
                  speed: 2
                }),
                require('imagemin-svgo')({
                  plugins: [
                    { removeTitle: true },
                    { convertPathData: false }
                  ]
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: './postcss.config.js' } }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: './postcss.config.js' } }
          }
        ]
      },

    ]
  },
  resolve: {
    alias: {
      '~': PATHS.src
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: `${PATHS.src}/index.html`,
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: `css/[name]-[contenthash].css`
    }),
    new CopyWebpackPlugin([
      {
        from: `${PATHS.src}/static`,
        to: ''
      },
      {
        from: `${PATHS.src}/fonts`,
        to: `${PATHS.build}/fonts`
      }
    ]),
    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality: 75
        }
      }],
      overrideExtension: true,
      detailedLogs: false,
      silent: false,
      strict: true
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        sourceMap: true,
        extractComments: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          chunks: 'all',
          test: /node_modules/,
          enforce: true
        },
      }
    }
  }
};
