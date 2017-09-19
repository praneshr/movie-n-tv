import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import globalStyles from 'global-styles'
import reactEasyBind from 'react-easy-bind'
import styles from './styles'

@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
@reactEasyBind
class Offline extends Component {
  render () {
    return (
      <div styleName="offline">
        <i styleName="nc-icon nc-wifi-off"></i>
        <p>A working internet connection is required.</p>
      </div>
    )
  }
}

export default Offline