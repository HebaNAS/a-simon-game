var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

var entry = PRODUCTION
    ? {
        main: './src/js/index.js'
    }
    : [
        './src/js/index.js',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080'
      ];

var plugins = PRODUCTION
    ? [
      new webpack.optimize.UglifyJsPlugin(),
      new ExtractTextPlugin({
        filename: 'styles/[name]-[contenthash:10].css',
        allChunks: true
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.template.html',
        minify: {
          collapseWhitespace: true
        }
      })
    ]
    : [ new webpack.HotModuleReplacementPlugin() ];

plugins.push(new webpack.DefinePlugin({
  DEVELOPMENT: JSON.stringify(DEVELOPMENT),
  PRODUCTION: JSON.stringify(PRODUCTION)
}))

const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';

const cssLoader = PRODUCTION
  ? ExtractTextPlugin.extract({
      use: ['css-loader?localIdentName=' + cssIdentifier, 'sass-loader']
    })
  : ['style-loader', 'css-loader', 'sass-loader'];

module.exports = {
  externals: {
    'jquery': 'jQuery'
  },
  devtool: 'source-map',
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: PRODUCTION ? '/' : '/dist/',
    filename: PRODUCTION ? 'js/[name].[hash:12].min.js' : 'js/bundle.js'
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.(png|jpeg|gif|jpg)$/,
        exclude: /node_modules/,
        use: ['url-loader?limit=10000&name=img/[name].[ext]']
      }, {
        test: /\.s?css$/,
        use: cssLoader
      }, {
         test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
         use: ['url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]']
      }, {
         test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
         use: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  }
};
