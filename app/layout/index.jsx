import reactStyles from 'react-css-modules'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { uiStates, uiActions } from '../redux-connect'
import styles from './style'
import globalStyles from 'global-styles'
import Header from '../components/header'
import Footer from '../components/footer'

@connect(uiStates, uiActions)
@reactStyles({ ...styles, ...globalStyles })
export default class Root extends Component {

  render() {
    return (
      <div id="layout">
        <Header />
        <div styleName="page">
          { this.props.children }
        </div>
        <Footer />
      </div>
    )
  }
}

Root.propTypes = {
  children: PropTypes.element.isRequired,
  actions: PropTypes.shape(),
}
