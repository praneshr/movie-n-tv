import globalStyles from 'global-styles'
import ReactCSS from 'react-css-modules'
import ImageProgressive from 'react-progressive-bg-image'
import cn from 'classnames'
import LazyLoad from 'react-lazyload'
import truncate from 'lodash-es/truncate'
import { Link } from 'react-router'
import React, { Component } from 'react'
import reactEasyBind from 'react-easy-bind'
import { imageBase } from '../../APIs/config/'
import styles from './style'
import { rating as rate } from '../../utils'


@ReactCSS({ ...styles, ...globalStyles }, { allowMultiple: true })
@reactEasyBind
class MovieCards extends Component {
  constructor() {
    super()
    this.state = {
      showAll: false,
    }
  }

  handleShowAll() {
    this.setState({
      showAll: true,
    })
  }

  resolvePoster(result) {
    switch (result.media_type) {
      case 'person':
        return result.profile_path
      default:
        return result.poster_path
    }
  }
  rateVoteAverage(vote) {
    if (vote < 5) {
      return 'bad'
    }
    if (vote < 7) {
      return 'average'
    }
    return 'good'
  }
  render() {
    const {
      type = 'default',
      limit,
      results,
      force,
    } = this.props
    const items = results.map((result, i) => {
      if (i >= limit && !this.state.showAll) return undefined
      const rating = result.vote_average
      const link = this.props.resolveLink
        ? this.props.resolveLink(
          force
            ? Object.assign({}, result, { media_type: force })
            : result,
        )
        : ''
      const poster = this.resolvePoster(result)
      const title = truncate(result.title || result.name, {
        length: 40,
      })
      return <Link to={link} key={i}>
        <div styleName={cn('col-xs-12 col-sm-6 col-md-4', type === 'thumbnail' ? 'col-lg-4' : 'col-lg-3')}>
          <div styleName={cn('card', type)}>
            <div>
              <LazyLoad
                offset={100}
                placeholder={<div styleName="image" />}
                once
              >
                <ImageProgressive
                  placeholder={`${imageBase}/w45${poster}`}
                  src={`${imageBase}/w500${poster}`}
                  className={styles.image}
                />
              </LazyLoad>
            </div>
            <div styleName="movie-info">
              <div>
                {title}
              </div>
              <div styleName="year">
                {
                  result.release_date
                  && result.release_date.split('-')[0]
                }
              </div>
              {
                result.media_type !== 'person'
                && <div styleName={cn('rating', 'with-star', rate(rating))}>
                  <div styleName="star-container">
                    <span styleName="star-icon below">☆</span>
                    <span styleName="star-icon above" style={{ width: `${rating * 10}%` }}>★</span>
                  </div>
                  <span styleName="rating-number">
                    {rating.toFixed(1)}
                  </span>
                </div>
              }
            </div>
          </div>
        </div>
      </Link>
    })
    return <div>
      <div styleName="row">
        {items}
      </div>
      {
        results.length > limit
        && !this.state.showAll
        && <button
          onClick={this.handleShowAll}
          styleName="button-primary">
          View all {results.length} movies
        </button>
      }
    </div>
  }
}

export default MovieCards