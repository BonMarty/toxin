const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

const pages = fs.readdirSync(`${__dirname}/src/pages`);

let mode = 'development';

if ((process.env.NODE_ENV = 'production')) {
  mode = 'production';
}

module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },
  stats: {
    children: true,
  },
  mode: mode,
  entry: {
    app: './src/app/app.js',
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: mode === 'development' ? true : false,
  },
  devtool: mode === 'development' ? 'source-map' : 'eval',
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    ...pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${__dirname}/src/pages/${page}/${page}.pug`,
          filename: `./${page}.html`,
        }),
    ),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },

      {
        test: /\.(sass|scss|css)$/,
        use: [
          mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env', {}]],
              },
            },
          },
          'sass-loader',
        ],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /(node_modules|bower_components)/,
      },

      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
