const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const webpack = require('webpack'); // ✅ import webpack
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 3000,
    historyApiFallback: true,
  },
  output: { publicPath: 'auto' },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-react','@babel/preset-typescript'] }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_AUTH_URL': JSON.stringify(process.env.REACT_APP_AUTH_URL || 'http://localhost:3001/remoteEntry.js'),
      'process.env.REACT_APP_BOOKING_URL': JSON.stringify(process.env.REACT_APP_BOOKING_URL || 'http://localhost:3002/remoteEntry.js'),
      'process.env.REACT_APP_REPORTING_URL': JSON.stringify(process.env.REACT_APP_REPORTING_URL || 'http://localhost:3003/remoteEntry.js'),
    }),
    new ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        authApp: `authApp@${process.env.REACT_APP_AUTH_URL || 'http://localhost:3001/remoteEntry.js'}`,
        bookingApp: `bookingApp@${process.env.REACT_APP_BOOKING_URL || 'http://localhost:3002/remoteEntry.js'}`,
        reportingApp: `reportingApp@${process.env.REACT_APP_REPORTING_URL || 'http://localhost:3003/remoteEntry.js'}`,
      },
      exposes: {},
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
      },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ]
};
