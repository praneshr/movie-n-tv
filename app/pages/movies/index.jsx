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
import BannerSkeleton from '../../components/banner-skeleton'
import MovieCards from '../../components/movie-cards/async'
import MovieBanner from '../../components/movie-banner/'
import logo from '../../globals/assets/logo.png'


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
      },
    } = this.props
    const latest = results[0]
    return (
      <div styleName="movies">
        <Helmet>
          <title>Box Office - Movies, Tv Shows, Celebrities and more</title>
          <meta name="author" content="Pranesh Ravi" />
          <meta name="description" content="Lorem ipsum" />

          <meta content={logo} property="og:image" />
          <meta content="Box Office" property="og:site_name" />
          <meta content="object" property="og:type" />
          <meta content="Movies" property="og:title" />
          <meta content="https://bx.now.sh/movies" property="og:url" />
          <meta content="New Movies In Theaters" property="og:description" />
        </Helmet>
        <div styleName="banner">
          <MovieBanner latest={banner} />
        </div>
        <div styleName="container list">
          <div styleName="row">
            <div styleName="sub-heading-with-icon heading">
              <i styleName="nc-icon nc-video-66"></i>
              <h2>In Cinemas</h2>
            </div>
            {
              latest === undefined
                ? new Array(20).fill(undefined).map((el, i) => <CardSkeleton key={i}/>)
                : <MovieCards
                  resolveLink={resolveUrl}
                  results={results} />
            }
          </div>
        </div>
      </div>
    )
  }
}
