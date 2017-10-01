import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import ImageProgressive from 'react-progressive-bg-image'
import globalStyles from 'global-styles'
import { Helmet } from 'react-helmet'
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

  constructor() {
    super()
    this.state = {
      mounted: false,
    }
  }

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

  componentDidMount() {
    this.setState({
      mounted: true,
    })
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
        {
          tvDetails
          && <Helmet>
            <title>{tvDetails.name} - Box Office</title>
            <meta content={`${imageBase}/w500${tvDetails.poster_path}`} property="og:image" />
            <meta content="Box Office" property="og:site_name" />
            <meta content="object" property="og:type" />
            <meta content={tvDetails.name} property="og:title" />
            <meta content={`https://bx.now.sh/tv/${id}`} property="og:url" />
            <meta content={tvDetails.overview} property="og:description" />

            <meta name="twitter:card" value="summary_large_image" />
            <meta name="twitter:site" value="@pranesh_ravi" />
            <meta name="twitter:creator" value="@pranesh_ravi" />
            <meta name="twitter:title" content={tvDetails.name} />
            <meta name="twitter:description" content={tvDetails.overview} />
            <meta name="twitter:image" content={`${imageBase}/w500${tvDetails.poster_path}`} />
            <meta name="twitter:label1" content="Rating" />
            <meta name="twitter:value1" content={`${tvDetails.vote_average.toFixed(1)}/10`} />
            <meta name="twitter:label2" content="Year" />
            <meta name="twitter:value2" content={`${tvDetails.release_date.split('-')[0]}`} />
          </Helmet>
        }
        <div styleName="banner">
          {
            tvDetails
            && this.state.mounted
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
                  (tvDetails && this.state.mounted)
                  ? this.getleftPane(tvDetails)
                  : <div styleName="skeleton-placeholder poster-img placeholder" />
                }
              </div>
            </div>
            <div styleName="col-md-8 col-xs-12">
               {
                (tvDetails && this.state.mounted)
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