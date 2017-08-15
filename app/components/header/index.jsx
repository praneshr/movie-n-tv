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
        <div styleName="col-xs-2 col-sm-6 logo">
          <Link to="/">
            <span styleName="hidden-xs">
              Box Office
            </span>
            <span styleName="visible-xs">
              BO
            </span>
          </Link>
        </div>
        <div styleName="col-xs-10 col-sm-6 search">
          <div styleName="col-lg-offset-10 col-sm-offset-11 ">
            <span onClick={this.handleSearch}>Search</span>
          </div>
        </div>
      </header>
    )
  }
}
