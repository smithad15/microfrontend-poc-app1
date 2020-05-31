const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const mode = process.env.NODE_ENV || 'production';
const publicPath = process.env.PUBLIC_URL;

module.exports = {
  mode,
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath must match hosted location. Gets embedded into the remoteEntry file
    publicPath,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new ModuleFederationPlugin({
      name: 'app1',
      library: { type: 'var', name: 'app1' },
      filename: 'remoteEntry.js',
      exposes: {
        mainEntry: './src/App',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
