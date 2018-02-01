const path = require('path');
const ENV_DEVELOPMENT = 'dev';
const ENV_TEST = 'test';
const ENV_PRODUCTION = 'production';
const assetsPath = path.join(__dirname, 'public');
const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

const envName = process.env['NODE_ENV'] ? process.env['NODE_ENV'] : ENV_DEVELOPMENT;
console.log('Starting Webpack in ' + envName + ' environment');

let config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        options: {
          presets: ['env', 'react'],
          plugins: ['styled-jsx/babel', 'transform-object-rest-spread']
        }
      },
      {
        test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[path][name].[ext]',
            limit: 10000, // Encode files which are less than that bytes as data URLs
            exclude: [assetsPath]
          }
        }
      }
    ]
  },
  plugins: []
};

switch (envName) {
  case ENV_DEVELOPMENT:
    //
    // Dev environment config
    //
    config.watch = true;
    config.devtool = 'source-map';
    config.module.rules.push(
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
      // , {
      //     test: /\.js$/,
      //     exclude: /node_modules/,
      //     loader: "eslint-loader",
      // }
    );
    break;

  case ENV_TEST:
    //
    // Test environment config
    //
    config.watch = false;
    break;

  case ENV_PRODUCTION:
    //
    // Production environment config
    //
    config.watch = false;
    break;
}
module.exports = config;
