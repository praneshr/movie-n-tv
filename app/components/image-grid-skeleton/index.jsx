import React, { Component } from 'react'
import reactEasyBind from 'react-easy-bind'
import ReactCSS from 'react-css-modules'
import globalStyles from 'global-styles'
import styles from './styles'

@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
@reactEasyBind
class componentName extends Component {

  render() {
    const {
      count = 1,
    } = this.props
    return <div>
      {
        new Array(count)
          .fill(undefined)
          .map(() => {
            return <div styleName="col-xs-6 col-sm-3">
              <div styleName="skeleton-placeholder img" />
            </div>
          })
      }
    </div>
  }
}

export default componentName