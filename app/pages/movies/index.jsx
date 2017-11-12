import globalStyles from 'global-styles'
import reactStyles from 'react-css-modules'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { uiStates, uiActions } from '../../redux-connect'
import { resolveUrl } from '../../utils'
import style from './style'
import CardSkeleton from '../../components/card-skeleton'
import MovieCards from '../../components/movie-cards/async'
import MovieBanner from '../../components/movie-banner/'


@connect(uiStates, uiActions)
@withStyles(style)
@reactStyles({ ...style, ...globalStyles }, { allowMultiple: true })
export default class Movies extends Component {

  constructor() {
    super()
    this.renderbannerImage = this.renderbannerImage.bind(this)
  }

  componentDidMount() {
    if (!this.props.ui.nowPlaying) {
      this.props.actions.getNowPlaying({
        region: 'US',
      })
      .then(({ data }) => {
        this.props.actions.nowPlaying(data)
      })
    }

    if (!this.props.ui.tvList) {
      this.props.actions.getTvList({
        region: 'US',
      })
      .then(({ data }) => {
        this.props.actions.tvList(data)
      })
    }
  }

  renderbannerImage(src, cstyle) {
    const bgi = {
      backgroundImage: `url(${src})`,
    }
    return <div
      className="banner"
      style={{ ...cstyle, ...bgi }}
    />
  }


  render() {
    const {
      ui: {
        banner,
        nowPlaying: {
          results = [],
        } = {},
        tvList: {
          results: tvResults = [],
        } = {},
      },
    } = this.props
    const latest = results[0]
    return (
      <div styleName="movies">
        <Helmet>
          <title>The Movie and TV - Movies, Tv Shows, Celebrities and more</title>
          <meta name="author" content="Pranesh Ravi" />
          <meta name="description" content="Get the latest information about your favorite movies, Tv shows, celebrites and more." />

          <meta content="//cdn.themovientv.com/logo.png" property="og:image" />
          <meta content="Movies" property="og:site_name" />
          <meta content="object" property="og:type" />
          <meta content="The Movie and Tv" property="og:title" />
          <meta content="https://themovientv.com/" property="og:url" />
          <meta content="Get the latest information about your favorite movies, Tv shows, celebrites and more." property="og:description" />

          <meta name="twitter:card" value="summary_large_image" />
          <meta name="twitter:site" value="@pranesh_ravi" />
          <meta name="twitter:creator" value="@pranesh_ravi" />
          <meta name="twitter:title" content="The Movie and Tv" />
          <meta name="twitter:description" content="Get the latest information about your favorite movies, Tv shows, celebrites and more." />
          <meta name="twitter:image" content="//cdn.themovientv.com/logo.png" />
        </Helmet>
        <div styleName="banner">
          <MovieBanner latest={banner} />
        </div>
        <div styleName="container list">
          <div styleName="row">
            <div>
              <div styleName="sub-heading-with-icon heading">
                <i styleName="nc-icon nc-video-66" />
                <h2>In Cinemas</h2>
              </div>
              <div>
                {
                  latest === undefined
                    ? <div styleName="row">
                      {new Array(20).fill(undefined).map((el, i) => <CardSkeleton key={i} />)}
                    </div>
                    : <MovieCards
                      resolveLink={resolveUrl}
                      results={results} />
                }
              </div>
            </div>
            <div>
              <div styleName="sub-heading-with-icon heading tv-section">
                <i styleName="nc-icon nc-video-66" />
                <h2>TV Shows Airing Today</h2>
              </div>
              <div>
                {
                  tvResults.length === 0
                    ? <div styleName="row">
                      {new Array(20).fill(undefined).map((el, i) => <CardSkeleton key={i} />)}
                    </div>
                    : <MovieCards
                      force="tv"
                      resolveLink={resolveUrl}
                      results={tvResults} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
