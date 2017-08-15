import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import globalStyles from 'global-styles'
import cn from 'classnames'
import styles from './styles'
import Genres from '../genres'
import { rating } from '../../utils'


@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
class Details extends Component {

  render () {
    const {
      data
    } = this.props
    const certificatefiltered = this.props.data
      .releases
      .countries
      .filter(x => x.iso_3166_1 === 'US')[0]
    const certificates = certificatefiltered ? certificatefiltered : {}
    return (
      <div styleName="details">
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
            {data.release_date.split('-')[0]}
          </span>
          <span>
            {data.runtime} mins
          </span>
        </div>
        <div styleName="rating-container">
          <span styleName={cn('rating', rating(data.vote_average))}>
            {data.vote_average}
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
      </div>
    )
  }
}

export default Details