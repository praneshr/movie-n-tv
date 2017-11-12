import reactStyles from 'react-css-modules'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import globalStyles from 'global-styles'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uiStates, uiActions } from '../redux-connect'
import styles from './style'
import Header from '../components/header'
import Footer from '../components/footer'
import Offline from '../components/offline'

@connect(uiStates, uiActions)
@withStyles({ ...styles, ...globalStyles })
@reactStyles(styles)
export default class Root extends Component {

  componentDidMount() {
    window.addEventListener('offline', () => {
      this.props.actions.offline(true)
    })

    window.addEventListener('online', () => {
      this.props.actions.offline(false)
    })
  }


  render() {
    let n = true
    try {
      n = navigator.onLine
    } catch (e) { }
    if (!n || this.props.ui.offline) {
      return <Offline />
    }
    return (
      <div id="layout">
        <Header />
        <div styleName="page">
          { this.props.children }
        </div>
        <Footer quote={this.props.ui.quote}/>
      </div>
    )
  }
}
