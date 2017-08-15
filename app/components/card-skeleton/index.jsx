import React, { Component, PropTypes } from 'react'
import ReactCSS from 'react-css-modules'
import globalStyles from 'global-styles'
import styles from './styles'

@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
class CardSketeon extends Component {

  render() {
    return (
      <div styleName="col-sm-12 col-md-4 col-lg-3">
        <div styleName="card">
          <div styleName="skeleton-placeholder image" />
          <div styleName="skeleton-placeholder name" />
          <div styleName="skeleton-placeholder rating" />
        </div>
      </div>
    )
  }
}

export default CardSketeon