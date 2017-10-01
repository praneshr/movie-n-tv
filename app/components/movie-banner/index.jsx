import ImageProgressive from 'react-progressive-bg-image'
import globalStyles from 'global-styles'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import ReactCSS from 'react-css-modules'
import { Link } from 'react-router'
import React, { Component } from 'react'
import { resolveUrl } from '../../utils'
import { imageBase } from '../../APIs/config/'
import styles from './style'


@withStyles(styles)
@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
class MovieBanner extends Component {
  constructor() {
    super()
    this.state = {
      rendered: false,
    }
  }

  componentDidMount () {
    this.setState({
      rendered: true,
    })
  }

  render() {
    const {
      latest,
    } = this.props
    return (
      <div>
        <div styleName="text-content">
          <div>
            <div styleName="title">
              {latest.title}
            </div>
            <div styleName="row">
              <div styleName="description hidden-xs col-sm-12 col-lg-6">
                {latest.overview}
              </div>
            </div>
            <Link to={resolveUrl(latest)}>
              <button styleName="button-primary play">
                <span>Check it out</span>
                <i styleName="nc-icon nc-tail-triangle-right"></i>
              </button>
            </Link>
          </div>
        </div>
        {
          this.state.rendered
          && <ImageProgressive
            placeholder={`${imageBase}/w45${latest.backdrop_path}`}
            src={`${imageBase}/${window.innerWidth < 700 ? 'w780' : 'original'}${latest.backdrop_path}`}
            style={{
              height: '100vh',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}
          />
        }
        <div styleName="fade-out"></div>
      </div>
    )
  }
}

export default MovieBanner