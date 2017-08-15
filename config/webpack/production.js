import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HTMLwebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import CWP from 'clean-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

const entries = [
  'babel-polyfill',
  './app/index.jsx',
]
const vendor = new ExtractTextPlugin('vendor.min.css')
const main = new ExtractTextPlugin('bundle.min.css')
export default {
  browser: {
    entry: entries,
    module: {
      rules: [
        {
          test: /\.global\.scss$/,
          loader: vendor.extract({
            fallbackLoader: 'style-loader',
            loader: [
              'css-loader?minimize',
              'sass-loader',
              'sass-resources-loader',
              'postcss-loader',
            ],
          }),
        },
        {
          test: /^((?!\.global).)*\.scss/,
          loaders: main.extract({
            fallbackLoader: 'style-loader',
            loader: [
              'css-loader?modules&minimize&importLoaders=1&localIdentName=[hash:base64:15]',
              'sass-loader',
              'sass-resources-loader',
              'postcss-loader',
            ],
          }),
        },
        {
          test: /\.jpe?g$|\.gif$|\.png$|\.ico$|\.svg$/,
          loader: 'file-loader',
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          loader: 'url-loader',
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      path: path.resolve('./build/assets/'),
      filename: 'bundle.min.js',
      publicPath: '/assets/',
    },
    plugins: [
      vendor,
      main,
      new HTMLwebpackPlugin({
        filename: '../index.html',
        template: './app/views/index.ejs',
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [
            autoprefixer(),
          ],
          sassResources: [
            './app/globals/styles/_colors.scss',
            './app/globals/styles/_variables.scss',
          ],
          context: path.resolve(__dirname, '../../'),
        },
      }),
      new CWP(['build'], {
        root: path.resolve(__dirname, '../../'),
      }),
    ],
  },
  server: {
    entry: './server/',
    resolve: {
      extensions: ['.js'],
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: /^[a-z\-0-9]+$/,
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      path: './',
      filename: 'server.js',
      libraryTarget: 'commonjs2',
    },
    plugins: [
      new CWP(['server.js'], {
        root: path.resolve(__dirname, '../../'),
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        },
      }),
    ],
  },
}
