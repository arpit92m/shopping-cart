const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");var extractCss = new ExtractTextPlugin("css/style.css");
var extractCss = new ExtractTextPlugin("css/style.css");
const webpack = require("webpack");

module.exports = {
  entry: ["./src/styles/main.scss","./src/index.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./public/dist")
  },
  module: {
    rules: [
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: "babel-loader"
      }
    ]
  },
  devServer: {
    contentBase: "./public/",
    watchContentBase: true,
    inline:true,
    port: 8080
  },
  devtool: 'eval-source-map',
  plugins: [
    new ExtractTextPlugin("bundle.css"),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
