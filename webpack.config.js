// 클라이언트 사이드 코드이기 때문에, 바벨의 영향을 받지 않는다
// es6 이전 문법을 사용해야함

var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractCss = require('extract-text-webpack-plugin');

var MODE = process.env.WEBPACK_ENV;
var ENTRY_FILE = path.resolve(__dirname, 'assets', 'js', 'main.js');
var OUTPUT_DIR = path.join(__dirname, 'static');

var config = {
  entry: ['@babel/polyfill', ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: ExtractCss.extract([
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [autoprefixer({ browsers: 'cover 99.5%' })];
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: '[name].js'
  },
  plugins: [new ExtractCss('styles.css')]
};

module.exports = config;
