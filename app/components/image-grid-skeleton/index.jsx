import React, { Component } from 'react'
import reactEasyBind from 'react-easy-bind'
import ReactCSS from 'react-css-modules'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import globalStyles from 'global-styles'
import styles from './styles'

@withStyles(styles)
@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
@reactEasyBind
class componentName extends Component {

  render() {
    const {
      count = 1,
    } = this.props
    return <div styleName="row">
      {
        new Array(count)
          .fill(undefined)
          .map((el, i) => {
            return <div styleName="col-xs-6 col-sm-3" key={i}>
              <div styleName="skeleton-placeholder img" />
            </div>
          })
      }
    </div>
  }
}

export default componentName