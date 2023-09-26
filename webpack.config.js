const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './client/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
      failOnError: true
    }),
    new CopyPlugin({
      patterns: [
        // { from: 'client/assets', to: path.resolve(__dirname, 'dist/assets') },
        { from: 'client/assets', to: path.resolve(__dirname, 'public/assets') }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    hot: true,
    compress: true,
    port: 9000,
    proxy: {
      '/': {
        target: 'http://localhost:9000',
        router: () => 'http://localhost:8000',
        logLevel: 'debug'
      },
      '/api': {
        target: 'http://localhost:9000',
        router: () => 'http://localhost:8000',
        logLevel: 'debug'
      }
    }
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
}
