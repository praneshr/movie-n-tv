import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import cn from 'classnames'
import globalStyles from 'global-styles'
import styles from './styles'

@withStyles(styles)
@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
class CardSketeon extends Component {

  render() {
    const {
      type = 'default',
    } = this.props
    return (
      <div styleName={cn('col-xs-6 col-md-4', type === 'thumbnail' ? 'col-lg-4' : 'col-lg-3')}>
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
