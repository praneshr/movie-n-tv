process.env.NODE_CONFIG_DIR = './config/webpack'

const _ = require('lodash')
const config = require('config')

module.exports = [
  _.omit(config.browser, 'watch'),
  _.omit(config.server, 'watch'),
]
