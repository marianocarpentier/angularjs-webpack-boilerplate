const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const commonConfig = {
  entry: './src/app.module.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public/dist/'),
    publicPath: '/dist/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
        'eslint-loader']
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    },
    {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['./public/dist/']),
    new ExtractTextPlugin('style.css'),
  ]
};
const devConfig = {
  devServer: {
    contentBase: './public/',
    historyApiFallback: true
  },
  devtool: 'eval-source-map' // https://webpack.js.org/configuration/devtool/#devtool
};
const prodConfig = {
  plugins: [
    new UglifyJsPlugin()
  ]
};


module.exports = env => {
  if (env && (env.production || (env.NODE_ENV && env.NODE_ENV.indexOf('prod') > -1))) {
    console.log('Using production config');
    return merge(commonConfig, prodConfig);
  } else {
    console.log('Using development config');
    return merge(commonConfig, devConfig);
  }
}
