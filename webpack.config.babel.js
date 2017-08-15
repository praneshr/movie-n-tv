import _ from 'lodash'
import config from 'config'

export default [
  _.omit(config.webpack.browser, 'watch'),
  _.omit(config.webpack.server, 'watch'),
]
