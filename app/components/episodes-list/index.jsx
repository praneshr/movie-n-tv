import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import ImageProgressive from 'react-progressive-bg-image'
import globalStyles from 'global-styles'
import reactEasyBind from 'react-easy-bind'
import { Link } from 'react-router'
import Truncate from '../truncate'

import styles from './styles'
import { imageBase } from '../../APIs/config/'

@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
@reactEasyBind
class EpisodesList extends Component {
  render() {
    const {
      data,
    } = this.props
    const episodes = data.map((episode, i) => {
      return <div styleName="col-xs-12 episode" key={i}>
        <div styleName="row">
          <div styleName="col-xs-12 col-sm-4 col-lg-3">
            <div styleName="pic-container">
              <div styleName="hidden-xs hidden-sm">
                <ImageProgressive
                  className={styles['still-pic']}
                  placeholder={`${imageBase}/w45${episode.still_path}`}
                  src={`${imageBase}/w300${episode.still_path}`}
                />
              </div>
              <div styleName="visible-xs visible-sm">
                <ImageProgressive
                  className={styles['still-pic']}
                  placeholder={`${imageBase}/w45${episode.still_path}`}
                  src={`${imageBase}/w780${episode.still_path}`}
                />
              </div>
            </div>
          </div>
          <div styleName="col-xs-12 col-sm-8 col-lg-9">
            <div styleName="name">
              {episode.episode_number}. {episode.name}
            </div>
            <div styleName="overview">
              <Truncate limit={200} text={episode.overview} />
            </div>
          </div>
        </div>
      </div>
    })
    return (
      <div styleName="episodes">
        <div styleName="row">
          {episodes}
        </div>
      </div>
    )
  }
}

export default EpisodesList