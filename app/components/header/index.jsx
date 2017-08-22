import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
import reactStyles from 'react-css-modules'
import globalStyles from 'global-styles'
import reactEasyBind from 'react-easy-bind'
import style from './style'

@reactStyles({ ...globalStyles, ...style }, { allowMultiple: true })
@reactEasyBind
export default class Sample extends Component {
  componentDidMount() {
    document.onscroll = () => {
      const scrollTop = (window.pageYOffset !== undefined)
        ? window.pageYOffset
        : (document.documentElement || document.body.parentNode || document.body).scrollTop
      const hasInvert = this.header.classList.contains(style.invert)
      if (scrollTop > 99 && !hasInvert) {
        this.header.classList.add(style.invert)
      } else if (scrollTop < 99 && hasInvert) {
        this.header.classList.remove(style.invert)
      }
    }
  }

  handleSearch(e) {
    browserHistory.push('/search')
  }

  render() {
    return (
      <header styleName="row header" ref={(el) => { this.header = el }}>
        <div styleName="col-xs-6 logo">
          <Link to="/">
            Box Office
          </Link>
        </div>
        <div styleName="col-xs-6 search">
          <span onClick={this.handleSearch}>
            <i styleName="nc-icon nc-zoom-split" />
            <span styleName="hidden-xs search-text">Search</span>
          </span>
        </div>
      </header>
    )
  }
}
