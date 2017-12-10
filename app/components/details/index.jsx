import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import globalStyles from 'global-styles'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import cn from 'classnames'
import styles from './styles'
import Genres from '../genres'
import { rating, resolveUrl } from '../../utils'
import Cast from '../cast/async'
import Images from '../image-grid/async'
import MovieCard from '../movie-cards/async'
import Reviews from '../reviews'

@withStyles(styles)
@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
class Details extends Component {

  render () {
    const {
      data,
    } = this.props
    const trailers = data.videos.results
      .filter(x => ['trailer', 'teaser'].indexOf(x.type.toLowerCase()) > -1 )
    const teasers = data.videos.results
      .filter(x => ['trailer', 'teaser'].indexOf(x.type.toLowerCase()) > -1)
    const video = trailers.length > 0 ? trailers[0] : teasers[0]
    const certificatefiltered = data
      .releases
      .countries
      .filter(x => x.iso_3166_1 === 'US')[0]
    const certificates = certificatefiltered || {}
    const upcoming = data.status.toLowerCase() !== 'released'
    return (
      <div styleName="details">
        {
          upcoming
          && <div styleName="upcoming">Upcoming</div>
        }
        <div styleName="title">
          {data.title}
        </div>
        <div styleName="cert-runtime">
          {
            certificates.certification
            && <span styleName="cert">
              {certificates.certification}
            </span>
          }
          <span>
            {data.runtime} mins
          </span>
          <span>
            {data.release_date.split('-')[0]}
          </span>
        </div>
        <div styleName="rating-container">
          <span styleName={cn('rating', rating(data.vote_average))}>
            {data.vote_average.toFixed(1)}
          </span>
          <span styleName="total">
            / 10
          </span>
          <span styleName="votes">
            ({data.vote_count} votes)
          </span>
        </div>
        <div className="genres">
          <Genres data={data.genres} />
        </div>
        <div styleName="description">
          {data.overview}
        </div>
        <div styleName="button-container">
          {
            video
            && <a
              href={`https://youtube.com/watch?v=${video.key}`}
              target="_blank">
              <button styleName="button-primary">
                <span>{video.type}</span>
              </button>
            </a>
          }
          <a
            target="_blank"
            href={`http://imdb.com/title/${data.imdb_id}`}>
            <button styleName="button-primary imdb">
              <span>IMDB</span>
            </button>
          </a>
        </div>
        <div styleName="sub-section cast">
          <div styleName="sub-heading-with-icon">
            <i styleName="nc-icon nc-multiple-11"></i>
            <h2>Cast</h2>
          </div>
          <Cast
            limit={8}
            data={data.credits.cast} />
        </div>
        <div styleName="sub-section reviews">
          <div styleName="sub-heading-with-icon">
            <i styleName="nc-icon nc-chat-round-content"></i>
            <h2>Reviews</h2>
          </div>
          <Reviews data={data.reviews.results} />
        </div>
        <div styleName="sub-section images">
          <div styleName="sub-heading-with-icon">
            <i styleName="nc-icon nc-album-2"></i>
            <h2>Posters & Photos</h2>
          </div>
          <Images
            limit={4}
            data={data.images.posters} />
        </div>
        {
          data.similar.results.length > 0
          && <div styleName="sub-section similar">
            <div styleName="sub-heading-with-icon">
              <i styleName="nc-icon nc-copy"></i>
              <h2>Similar Movies</h2>
            </div>
            <MovieCard
              resolveLink={resolveUrl}
              type="thumbnail"
              limit={6}
              results={data.similar.results} />
          </div>
        }
      </div>
    )
  }
}

export default Details
