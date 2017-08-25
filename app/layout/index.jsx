import reactStyles from 'react-css-modules'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import globalStyles from 'global-styles'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { uiStates, uiActions } from '../redux-connect'
import styles from './style'
import Header from '../components/header'
import Footer from '../components/footer'

@connect(uiStates, uiActions)
@withStyles({ ...styles, ...globalStyles })
@reactStyles(styles)
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
