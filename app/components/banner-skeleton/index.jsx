import globalStyles from 'global-styles'
import ReactCSS from 'react-css-modules'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import React, { Component } from 'react'
import styles from './style'


@withStyles(styles)
@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
class MovieBanner extends Component {
  render() {
    return (
      <div styleName="text-content">
        <div styleName="__q">
          <div styleName="skeleton-placeholder title" />
          <div styleName="skeleton-placeholder description" />
          <div styleName="skeleton-placeholder button" />
        </div>
      </div>
    )
  }
}

export default MovieBanner