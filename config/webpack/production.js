const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HTMLwebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CWP = require('clean-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const NameAllModulesPlugin = require('name-all-modules-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const S3Plugin = require('webpack-s3-plugin')
const mimeTypes = require('mime-types')
const OfflinePlugin = require('offline-plugin')

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

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    minimize: true,
    importLoaders: 1,
    localIdentName: '[hash:base64:5]',
  },
}

const fileLoader = {
  test: /\.(woff|woff2|eot|ttf|png|ico|svg|gif|jpe?g)$/,
  loader: 'file-loader',
}

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
              cssLoader,
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
        fileLoader,
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.hbs$/,
          loader: 'handlebars-loader',
        },
      ],
    },
    output: {
      path: path.resolve('./build/assets/'),
      filename: '[name].[chunkhash].min.js',
      chunkFilename: '[name].[chunkhash].min.js',
      publicPath: '//cdn.themovientv.com/',
      crossOriginLoading: 'anonymous',
    },
    plugins: [
      vendor,
      main,
      new HTMLwebpackPlugin({
        filename: '../head.hbs',
        template: './app/views/head.hbs',
        inject: false,
        minify: false,
      }),
      new HTMLwebpackPlugin({
        filename: '../body.hbs',
        template: './app/views/body.hbs',
        inject: false,
        minify: false,
      }),
      new HTMLwebpackPlugin({
        filename: '../tail.hbs',
        template: './app/views/tail.hbs',
        inject: false,
        minify: false,
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
        minChunks: Infinity,
      }),
      new FaviconsWebpackPlugin(path.join(process.cwd(), './app/globals/assets/logo.png')),
      new NameAllModulesPlugin(),
      new ManifestPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new MinifyPlugin({
        removeConsole: true,
        removeDebugger: true,
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
      new OfflinePlugin({
        caches: {
          main: [
            '*.js',
            '*.css',
          ],
          additional: [
            ':externals:',
          ],
        },
        externals: [
          '/',
        ],
        cacheMaps: [
          {
            match: /(\/\/cdn.themovientv.com\/).*/g,
            to: function (url) {
              return '/' + url.split('/')[1]
            },
            requestTypes: ['cross-origin', 'navigate'],
          },
        ],
        autoUpdate: true,
        version: () => { },
        ServiceWorker: {
          output: '../sw.js',
          scope: '/',
          cacheName: 'harlequin',
          navigateFallbackURL: '/',
          publicPath: '/sw.js',
          minify: true,
        },
        AppCache: false,
      }),
      new CopyWebpackPlugin([
        {
          from: './app/globals/assets/icons/',
          to: './icons',
        },
        {
          from: './app/app_manifest.json',
          to: './',
        },
        {
          from: './app/globals/assets/logo.png',
          to: './logo.png',
        },
      ]),
      new S3Plugin({
        exclude: /.*\.(html|hbs|map|cache)|sw.js/,
        s3Options: {
          accessKeyId: process.env.ACCESS_KEY,
          secretAccessKey: process.env.SECRET_KEY,
        },
        s3UploadOptions: {
          Bucket: 'harlequin-prod',
          CacheControl: 'max-age=31556952000, immutable',
          ContentType: fileName => mimeTypes.lookup(fileName),
        },
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
            'isomorphic-style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
        Object.assign({}, fileLoader, { options: { emitFile: false } }),
        {
          test: /\.scss$/,
          loaders: [
            'isomorphic-style-loader',
            cssLoader,
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
      new MinifyPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
  },
}
