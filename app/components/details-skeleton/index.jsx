import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import globalStyles from 'global-styles'
import styles from './styles'
import CastSkeleton from '../cast-skeleton'
import ImgSkeleton from '../image-grid-skeleton'

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
        <div styleName="sub-section">
          <h2>Cast</h2>
          <CastSkeleton count={8}/>
        </div>
        <div styleName="sub-section">
          <h2>Posters & Photos</h2>
          <ImgSkeleton count={4}/>
        </div>
      </div>
    )
  }
}

export default DetailsSkeleton