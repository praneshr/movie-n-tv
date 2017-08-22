import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactCSS from 'react-css-modules'
import globalStyles from 'global-styles'
import styles from './styles'
import { resolveUrl } from '../../utils'
import Episodes from '../episodes-list'
import Seasons from '../seasons-list'
import Genres from '../genres'


@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
class Details extends Component {

  render () {
    const {
      data,
      tvData,
    } = this.props
    const type = {
      media_type: 'tv',
    }
    const video = data.videos.results
      .filter(x =>
        ['trailer', 'teaser'].indexOf(x.type.toLowerCase()) > -1
      )[0]
    const otherSeasons = tvData.seasons
      .filter(x => x.season_number !== data.season_number)
    return (
      <div styleName="details">
        <div styleName="parent">
          <Link to={resolveUrl({ ...tvData, ...type })}>
            {tvData.name} /
          </Link>
        </div>
        <div styleName="title">
          {data.name}
        </div>
        <div styleName="cert-runtime">
          <span>
            {data.air_date.split('-')[0]}
          </span>
          <span>
            {data.episodes.length} episodes
          </span>
        </div>
        <div>
          <Genres data={tvData.genres} />
        </div>
        <div styleName="description">
          {data.overview}
        </div>
        {
          video
          && <div styleName="button-container">
            <a
              href={`https://youtube.com/watch?v=${video.key}`}
              target="_blank">
              <button styleName="button-primary">
                <i styleName="nc-icon nc-small-triangle-right" />
                <span>{video.type}</span>
              </button>
            </a>
          </div>
        }
        <div styleName="sub-section">
          <h2>Episodes</h2>
          <Episodes data={data.episodes} />
        </div>
        {
          otherSeasons.length > 0
          && <div styleName="sub-section">
            <h2>Other Seasons</h2>
            <Seasons
              tvId={tvData.id}
              data={otherSeasons}
              limit={4} />
          </div>
        }
      </div>
    )
  }
}

export default Details