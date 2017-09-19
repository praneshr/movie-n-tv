import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import ImageProgressive from 'react-progressive-bg-image'
import globalStyles from 'global-styles'
import { connect } from 'react-redux'
import { uiStates, uiActions } from '../../redux-connect'
import { imageBase } from '../../APIs/config/'
import styles from './styles'
import Details from '../../components/season-details/async'
import DetailsSkeleton from '../../components/season-details-skeleton'


@connect(uiStates, uiActions)
@withStyles(styles)
@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
class Movie extends Component {

  fetchData(props) {
    const {
      params: {
        id,
        seasonId,
      },
      ui: {
        tv,
        season,
      },
    } = props
    if (!tv[id]) {
      props.actions.getTv(id, {
        append_to_response: 'content_ratings,videos,images,credits,recommendations',
      })
      .then(({ data }) => {
        props.actions.tv({
          [id]: data,
        })
      })
    }
    if (!season[seasonId]) {
      props.actions.getSeason(id, seasonId, {
        append_to_response: 'content_ratings,videos,images,credits,similar',
      })
      .then(({ data }) => {
        props.actions.season({
          [`${id}__${seasonId}`]: data,
        })
      })
    }
  }

  componentDidMount () {
    this.fetchData(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.seasonId !== nextProps.params.seasonId) {
      this.fetchData(nextProps)
    }
  }


  getleftPane(tvDetails) {
    return <div>
      <ImageProgressive
        className={styles['poster-img']}
        placeholder={`${imageBase}/w92${tvDetails.poster_path}`}
        src={`${imageBase}/w780${tvDetails.poster_path}`}
      />
    </div>
  }

  getRandom(max) {
    return Math.floor(Math.random() * (max));
  }

  getImageFromEpisodes(episodes, fallback) {
    const episode = episodes[this.getRandom(episodes.length)]
    return episode.still_path
      ? <ImageProgressive
        className={styles['movie-banner']}
        placeholder={`${imageBase}/w45${episode.still_path}`}
        src={`${imageBase}/original${episode.still_path}`}
      />
      : <ImageProgressive
        className={styles['movie-banner']}
        placeholder={`${imageBase}/w45${fallback}`}
        src={`${imageBase}/original${fallback}`}
      />
  }

  render() {
    const {
      params: {
        id,
        seasonId,
      },
      ui: {
        tv,
        season,
      },
    } = this.props
    const tvDetails = tv[id]
    const seasonDetails = season[`${id}__${seasonId}`]
    return (
      <div styleName="tv-detail">
        <div styleName="banner">
          {
            seasonDetails
            && tvDetails
            && (
              seasonDetails.episodes.length > 0
                ? this.getImageFromEpisodes(seasonDetails.episodes, tvDetails.backdrop_path)
                : <ImageProgressive
                  className={styles['movie-banner']}
                  placeholder={`${imageBase}/w45${tvDetails.backdrop_path}`}
                  src={`${imageBase}/${window.innerWidth < 700 ? 'w780' : 'original'}${tvDetails.backdrop_path}`}
                />
            )
          }
          <div styleName="fade-out" />
        </div>
        <div styleName="container">
          <div styleName="row content">
            <div styleName="col-md-4 col-xs-8">
              <div styleName="poster">
                {
                  seasonDetails
                  ? this.getleftPane(seasonDetails)
                  : <div styleName="skeleton-placeholder poster-img placeholder" />
                }
              </div>
            </div>
            <div styleName="col-md-8 col-xs-12">
              {
                seasonDetails
                  ? <Details
                    tvData={tvDetails}
                    data={seasonDetails} />
                  : <DetailsSkeleton />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Movie