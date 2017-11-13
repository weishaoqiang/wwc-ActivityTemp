var path = require("path");
var webpack = require("webpack");
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var css = require("extract-text-webpack-plugin");
var config = {
  // target: 'web',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: 'bundle.[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: css.extract({
        fallback: "style-loader",
        use: ['css-loader','postcss-loader']
      }),
    }, {
      test: /\.scss$/,
      loader: css.extract({
        fallback: "style-loader",
        use: ['css-loader', 'postcss-loader', 'sass-loader']
      }),
    }, {
      test: /\.(png|jpg|svg|gif|eot|woff|ttf|jpeg)$/,
      use: ['url-loader?limit=8192'],
    },{
　　　test: /\.html$/,
　　　use: ['html-withimg-loader']
　  }]
  },
  plugins: [
    new css("style.css"),
    new HtmlWebpackPlugin({
      title: "万物仓xx活动",
      filename: 'index.html',
      // template: 'html-withimg-loader!' + './src/index.html',
      template: './src/index.html'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.[hash].js'
    }),
  ],
}
module.exports = config;
if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = module.exports.plugins.concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        }
      })
    ]);
    // module.exports.devtool = '#source-map';
} else {
  module.exports.devtool = '#source-map';
  module.exports.devServer = {
    contentBase: "./src", //本地服务器所加载的页面所在的目录
    disableHostCheck: true,
  }
}
