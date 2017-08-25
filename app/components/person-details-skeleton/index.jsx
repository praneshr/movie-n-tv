import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import globalStyles from 'global-styles'
import reactEasyBind from 'react-easy-bind'
import styles from './styles'
import MovieCardSkeleton from '../card-skeleton'
import ImagesSkeleton from '../image-grid-skeleton'

@withStyles(styles)
@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
@reactEasyBind
class PersonDetails extends Component {

  render() {
    return (
      <div styleName="details">
        <div styleName="skeleton-placeholder title" />
        <div styleName="skeleton-placeholder other-name" />
        <div styleName="skeleton-placeholder bio" />
        <div styleName="images sub-section">
          <h2>Photos</h2>
          <div styleName="row">
            <ImagesSkeleton count={5} />
          </div>
        </div>
        <div styleName="images sub-section">
          <h2>Appears in</h2>
          <div styleName="row">
            {
              new Array(5)
                .fill(undefined)
                .map((el, i) =>
                  <MovieCardSkeleton type="thumbnail" key={i}/>,
                )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default PersonDetails