import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
import reactStyles from 'react-css-modules'
import globalStyles from 'global-styles'
import reactEasyBind from 'react-easy-bind'
import $ from 'jquery'
import style from './style'

@reactStyles({ ...globalStyles, ...style }, { allowMultiple: true })
@reactEasyBind
export default class Sample extends Component {
  componentDidMount () {
    $(window).scroll(() => {
      const scrollTop = $(document).scrollTop()
      if (scrollTop > 99) {
        $('#header').addClass(style.invert)
      } else {
        $('#header').removeClass(style.invert)
      }
    })
  }

  handleSearch(e) {
    browserHistory.push('/search')
  }

  render() {
    return (
      <header styleName="row header" id="header">
        <div styleName="col-xs-6 logo">
          <Link to="/">
            Box Office
          </Link>
        </div>
        <div styleName="col-xs-6 search">
          <span onClick={this.handleSearch}>
            <i styleName="nc-icon nc-zoom-split" />
          </span>
        </div>
      </header>
    )
  }
}
