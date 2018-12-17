var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config()


module.exports = {
  // mode: 'development',
  mode: 'production',
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [{
        test: /\.vue?$/,
        exclude: /(node_modules)/,
        use: 'vue-loader'
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: process.env.TESS_PORTAL_API_URL,
      grafanaURL: process.env.TESS_PORTAL_GRAFANA_URL

    })
  }
};
