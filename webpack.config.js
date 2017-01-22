var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entrySources = process.env.NODE_ENV !== "production" ?
  [
    "babel-polyfill",
    "./src/index.js",
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server"
  ] :
  [
    "babel-polyfill",
    "./src/index.js"
  ];

module.exports = {
  entry: entrySources,
  output: {
    publicPath: "http://localhost:8080/",
    filename: "public/bundle.js"
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
        query: {
          interpolate: '\\[\\[\\[(.+?)\\]\\]\\]',
          evaluate: '\\[\\[(.+?)\\]\\]'
        }
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        excude: /node_modules/
      },
      {
        test: /\.styl$/,
        loaders: [ 'style', 'css?sourceMap', 'postcss-loader', 'sass?sourceMap']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({
      title: 'bitUI',
      filename: 'index.html',
      template: 'src/index.ejs'
    })
  ]
};
