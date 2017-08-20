import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import ImageProgressive from 'react-progressive-bg-image'
import globalStyles from 'global-styles'
import reactEasyBind from 'react-easy-bind'
import { Link } from 'react-router'

import styles from './styles'
import { imageBase } from '../../APIs/config/'

@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
@reactEasyBind
class Cast extends Component {

  constructor() {
    super()
    this.state = {
      showAll: false,
    }
  }

  handleShowAll() {
    this.setState({
      showAll: true,
    })
  }

  render() {
    const {
      data,
      limit,
      tvId,
    } = this.props

    const filteredData = data
      .slice()
      .filter(x => x.season_number !== 0)


    const seasons = filteredData
      .reverse()
      .map((data, i) => {
        if (i >= limit && !this.state.showAll) return undefined
        return <div styleName="col-xs-12 col-md-6 season" key={i}>
          <div styleName="row">
            <div styleName="col-xs-4 img">
              <Link to={`/tv/${tvId}/seasons/${data.season_number}`}>
                <ImageProgressive
                  className={styles['poster']}
                  placeholder={`${imageBase}/w45${data.poster_path}`}
                  src={`${imageBase}/w500${data.poster_path}`}
                />
              </Link>
            </div>
            <div styleName="col-xs-6">
              <div styleName="season-no">
                Season {data.season_number}
              </div>
              {
                data.air_date
                && <div styleName="air-date">
                  {data.air_date.split('-')[0]}
                </div>
              }
              <div styleName="episodes">
                {data.episode_count} episodes
              </div>
            </div>
          </div>
        </div>
      })
      return (
        <div styleName="seasons">
          <div styleName="row">
            {seasons}
          </div>
          {
            filteredData.length > limit
            && !this.state.showAll
            && <button
              onClick={this.handleShowAll}
              styleName="button-primary">
              View all {filteredData.length} seasons
            </button>
          }
        </div>
      )
  }
}

export default Cast