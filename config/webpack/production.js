const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HTMLwebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CWP = require('clean-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const NameAllModulesPlugin = require('name-all-modules-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

const entries = [
  './app/index.jsx',
]
const vendor = new ExtractTextPlugin({
  filename: 'vendor.[chunkhash].min.css',
  allChunks: true,
})

const main = new ExtractTextPlugin({
  filename: 'bundle.[chunkhash].min.css',
  allChunks: true,
  ignoreOrder: true,
})

module.exports = {
  browser: {
    entry: {
      vendor: [
        'react',
        'react-dom',
        'react-router',
      ],
      app: entries,
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.css$/,
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
          test: /\.scss/,
          loaders: main.extract({
            fallbackLoader: 'style-loader',
            loader: [
              'css-loader?modules&minimize&importLoaders=1&localIdentName=[hash:base64:5]',
              'sass-loader',
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: [
                    path.join(process.cwd(), './app/globals/styles/_colors.scss'),
                    path.join(process.cwd(), './app/globals/styles/_variables.scss'),
                  ],
                },
              },
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
      filename: '[name].[chunkhash].min.js',
      chunkFilename: '[name].[chunkhash].min.js',
      publicPath: '/assets/',
    },
    plugins: [
      vendor,
      main,
      new HTMLwebpackPlugin({
        filename: '../index.html',
        template: './app/views/index.ejs',
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.NamedChunksPlugin((chunk) => {
        if (chunk.name) {
          return chunk.name
        }
        return chunk.modules.map(m => path.relative(m.context, m.request)).join('_')
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
      }),
      new NameAllModulesPlugin(),
      new ManifestPlugin(),
      new ChunkManifestPlugin({
        filename: 'chunk-manifest.json',
        manifestVariable: 'webpackManifest',
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
          warnings: false,
          drop_console: true,
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
        },
        mangle: {
          except: ['webpackJsonp'],
          screw_ie8: true,
          keep_fnames: false,
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
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
      new SWPrecacheWebpackPlugin({
        cacheId: 'harlequin',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: true,
        navigateFallback: '/offline',
        staticFileGlobsIgnorePatterns: [/\.map$/, /\.html$/],
      }),
      new CWP(['build'], {
        root: path.resolve(__dirname, '../../'),
      }),
    ],
  },
  server: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loaders: [
            {
              loader: 'babel-loader',
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          loaders: [
            'node-style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.jpe?g$|\.gif$|\.png$|\.ico$|\.svg$/,
          loader: 'file-loader',
          options: {
            publicPath: '/assets/',
            emitFile: false,
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          loader: 'url-loader',
        },
        {
          test: /\.scss$/,
          loaders: [
            'css-loader/locals?minimize&modules&sourceMap&importLoaders=1&localIdentName=[hash:base64:5]',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.join(process.cwd(), './app/globals/styles/_colors.scss'),
                  path.join(process.cwd(), './app/globals/styles/_variables.scss'),
                ],
              },
            },
            'postcss-loader',
          ],
        },
      ],
    },
    plugins: [
      new CWP(['server.js'], {
        root: path.resolve(__dirname, '../../'),
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          resolve: {},
          postcss: [
            autoprefixer(),
          ],
          context: path.resolve(__dirname, '../../'),
        },
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
  },
}
