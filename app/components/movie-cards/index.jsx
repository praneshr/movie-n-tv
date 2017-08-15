import React, { Component } from 'react'
import { imageBase } from '../../APIs/config/'
import ImageProgressive from 'react-progressive-bg-image'
import cn from 'classnames'
import styles from './style'
import globalStyles from 'global-styles'
import ReactCSS from 'react-css-modules'
import { Link } from 'react-router'


@ReactCSS({ ...styles, ...globalStyles }, { allowMultiple: true })
class MovieCards extends Component {
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
    const items = this.props.results.map((result, i) => {
      const rating = result.vote_average
      const link = this.props.resolveLink
        ? this.props.resolveLink(result, i)
        : ''
      return <Link to={link}>
        <div styleName="col-sm-12 col-md-4 col-lg-3">
          <div styleName="card">
            <div className="image">
              <ImageProgressive
                placeholder={`${imageBase}/w45${result.poster_path}`}
                src={`${imageBase}/w500${result.poster_path}`}
                style={{
                  height: '400px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                }}
              />
            </div>
            <div styleName="movie-info">
              <div>
                {result.title}
              </div>
              <div styleName={cn('rating', 'with-star', this.rateVoteAverage(rating))}>
                <div styleName="star-container">
                  <span styleName="star-icon below">☆</span>
                  <span styleName="star-icon above" style={{ width: `${rating * 10}%` }}>★</span>
                </div>
                <span styleName="rating-number">
                  {rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    })
    return <span>
      {items}
    </span>
  }
}

export default MovieCards