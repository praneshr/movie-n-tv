import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import globalStyles from 'global-styles'
import styles from './styles'


@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
class CastSkeleton extends Component {
  render () {
    const {
      count = 1,
    } = this.props

    const cast = new Array(count)
      .fill(undefined)
      .map((el, i) => {
        return <div styleName="col-xs-12 col-md-6" key={i}>
          <div styleName="row">
            <div styleName="col-xs-5">
              <div styleName="skeleton-placeholder profile-pic" />
            </div>
            <div styleName="col-xs-7">
              <div styleName="skeleton-placeholder name" />
              <div styleName="skeleton-placeholder character" />
            </div>
          </div>
        </div>
      })
    return (
      <div styleName="row">
        {cast}
      </div>
    )
  }
}

export default CastSkeleton