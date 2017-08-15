import React, { Component } from 'react'
import reactStyles from 'react-css-modules'
import style from './style'
import banner from '../../globals/assets/future.png'

@reactStyles(style)
export default class Intro extends Component {

  render() {
    return (
      <div styleName="intro">
        <h1 styleName="heading">Smart React Boilerplate</h1>
        <img src={banner} alt="" />
      </div>
    )
  }
}
