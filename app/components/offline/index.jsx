import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import ReactCSS from 'react-css-modules'
import globalStyles from 'global-styles'
import reactEasyBind from 'react-easy-bind'
import styles from './styles'

@withStyles(styles)
@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
@reactEasyBind
class Offline extends Component {
  render () {
    return (
      <div>
        <div styleName="offline">
          <i styleName="nc-icon nc-wifi-off"></i>
          <p>A working internet connection is required.</p>
        </div>
      </div>
    )
  }
}

export default Offline
