import globalStyles from 'global-styles'
import reactStyles from 'react-css-modules'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uiStates, uiActions } from '../../redux-connect'
import { resolveUrl } from '../../utils'
import style from './style'
import CardSkeleton from '../../components/card-skeleton'
import BannerSkeleton from '../../components/banner-skeleton'
import MovieCards from '../../components/movie-cards/async'
import MovieBanner from '../../components/movie-banner/async'


@connect(uiStates, uiActions)
@reactStyles({ ...style, ...globalStyles }, { allowMultiple: true })
export default class Movies extends Component {

  constructor() {
    super()
    this.renderbannerImage = this.renderbannerImage.bind(this)
  }

  componentDidMount() {
    if (!this.props.ui.nowPlaying) {
      this.props.actions.getNowPlaying()
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
        nowPlaying: {
          results = [],
        } = {},
      },
    } = this.props
    const latest = results[0]

    return (
      <div styleName="movies">
        <div styleName="banner">
          {
            latest === undefined
              ? <BannerSkeleton />
              : <MovieBanner latest={latest} />
          }
        </div>
        <div styleName="container list">
          <div styleName="row">
            <h2>In Cinemas</h2>
            {
              latest === undefined
                ? new Array(20).fill(undefined).map(() => <CardSkeleton />)
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
