import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import ImageProgressive from 'react-progressive-bg-image'
import globalStyles from 'global-styles'
import { connect } from 'react-redux'
import { uiStates, uiActions } from '../../redux-connect'
import { imageBase } from '../../APIs/config/'
import styles from './styles'
import Details from '../../components/details/async'
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
        movies,
      },
    } = props
    if (!movies[id]) {
      props.actions.getMovie(id, {
        append_to_response: 'releases,images,videos,credits,similar,reviews',
      })
      .then(({ data }) => {
        props.actions.movies({
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


  getleftPane(movieDetails) {
    return <div>
      <ImageProgressive
        className={styles['poster-img']}
        placeholder={`${imageBase}/w92${movieDetails.poster_path}`}
        src={`${imageBase}/w500${movieDetails.poster_path}`}
      />
    </div>
  }

  render() {
    const {
      params: {
        id,
      },
      ui: {
        movies,
      },
    } = this.props
    const movieDetails = movies[id]
    return (
      <div styleName="movie-detail">
        <div styleName="banner">
          {
            movieDetails
            && <ImageProgressive
              className={styles['movie-banner']}
              placeholder={`${imageBase}/w45${movieDetails.backdrop_path}`}
              src={`${imageBase}/original${movieDetails.backdrop_path}`}
            />
          }
          <div styleName="fade-out" />
        </div>
        <div styleName="container">
          <div styleName="row content">
            <div styleName="col-md-4 col-xs-8">
              <div styleName="poster">
                {
                  movieDetails
                  ? this.getleftPane(movieDetails)
                  : <div styleName="skeleton-placeholder poster-img placeholder" />
                }
              </div>
            </div>
            <div styleName="col-md-8 col-xs-12">
              {
                movieDetails
                  ? <Details data={movieDetails} />
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