const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



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
    filename: 'js/[name].js',
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
        test: /\.(png|jpg|gif|svg|webp)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
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
      '~': 'src'
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: `${PATHS.src}/index.html`,
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: `css/[name].css`
    }),
    new CopyWebpackPlugin([
      {
        from: `${PATHS.src}/images`,
        to: `${PATHS.build}/images`
      },
      {
        from: `${PATHS.src}/static`,
        to: ''
      },
      {
        from: `${PATHS.src}/fonts`,
        to: `${PATHS.build}/fonts`
      }
    ])
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
