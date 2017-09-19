import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import ImageProgressive from 'react-progressive-bg-image'
import globalStyles from 'global-styles'
import { connect } from 'react-redux'
import { uiStates, uiActions } from '../../redux-connect'
import { imageBase } from '../../APIs/config/'
import styles from './styles'
import Details from '../../components/tv-details/async'
import DetailsSkeleton from '../../components/details-skeleton'


@connect(uiStates, uiActions)
@withStyles(styles)
@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
class Movie extends Component {

  fetchData(props) {
    const {
      params: {
        id,
      },
      ui: {
        tv,
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
  }

  componentDidMount () {
    this.fetchData(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.fetchData(nextProps)
    }
  }


  getleftPane(tvDetails) {
    return <div>
      <ImageProgressive
        className={styles['poster-img']}
        placeholder={`${imageBase}/w92${tvDetails.poster_path}`}
        src={`${imageBase}/w500${tvDetails.poster_path}`}
      />
    </div>
  }

  render() {
    const {
      params: {
        id,
      },
      ui: {
        tv,
      },
    } = this.props
    const tvDetails = tv[id]
    return (
      <div styleName="tv-detail">
        <div styleName="banner">
          {
            tvDetails
            && <ImageProgressive
              className={styles['movie-banner']}
              placeholder={`${imageBase}/w45${tvDetails.backdrop_path}`}
              src={`${imageBase}/${window.innerWidth < 700 ? 'w780' : 'original'}${tvDetails.backdrop_path}`}
            />
          }
          <div styleName="fade-out" />
        </div>
        <div styleName="container">
          <div styleName="row content">
            <div styleName="col-md-4 col-xs-8">
              <div styleName="poster">
                {
                  tvDetails
                  ? this.getleftPane(tvDetails)
                  : <div styleName="skeleton-placeholder poster-img placeholder" />
                }
              </div>
            </div>
            <div styleName="col-md-8 col-xs-12">
               {
                tvDetails
                  ? <Details data={tvDetails} />
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