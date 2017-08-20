import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import globalStyles from 'global-styles'
import reactEasyBind from 'react-easy-bind'

import styles from './styles'

@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
@reactEasyBind
class EpisodesListSkeleton extends Component {
  render() {
    const {
      count,
    } = this.props

    const episodes = new Array(count)
      .fill(undefined)
      .map((el, i) => {
        return <div styleName="col-xs-12 episode" key={i}>
          <div styleName="row">
            <div styleName="col-xs-6 col-md-3">
              <div styleName="skeleton-placeholder still-pic" />
            </div>
            <div styleName="col-xs-12 col-md-9">
              <div styleName="skeleton-placeholder name" />
              <div styleName="skeleton-placeholder overview" />
            </div>
          </div>
        </div>
    })
    return (
      <div styleName="row episodes">
        {episodes}
      </div>
    )
  }
}

export default EpisodesListSkeleton