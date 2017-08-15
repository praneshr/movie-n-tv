import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import styles from './styles'
import globalStyles from 'global-styles'

@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true})
class DetailsSkeleton extends Component {
  render () {
    return (
      <div styleName="details">
        <div styleName="skeleton-placeholder title" />
        <div styleName="skeleton-placeholder cert-runtime" />
        <div styleName="skeleton-placeholder rating-container" />
        <div styleName="skeleton-placeholder genres" />
        <div styleName="skeleton-placeholder description" />
      </div>
    )
  }
}

export default DetailsSkeleton