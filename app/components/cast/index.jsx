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
    } = this.props

    const cast = data.map((person, i) => {
      if (i >= limit && !this.state.showAll) return undefined
      return <div styleName="col-xs-12 col-sm-6 person">
        <div styleName="row">
          <div styleName="col-xs-5 pic-container">
            <Link to={`/people/${person.id}`}>
              <ImageProgressive
                className={styles['profile-pic']}
                placeholder={`${imageBase}/w45${person.profile_path}`}
                src={`${imageBase}/w185${person.profile_path}`}
              />
            </Link>
          </div>
          <div styleName="col-xs-7">
            <div styleName="name">
              <Link to={`/people/${person.id}`}>
                {person.name}
              </Link>
            </div>
            <div styleName="character">{person.character}</div>
          </div>
        </div>
      </div>
    })
    return (
      <div styleName="cast">
        <div styleName="row">
          {cast}
        </div>
        {
          data.length > limit
          && !this.state.showAll
          && <button
            onClick={this.handleShowAll}
            styleName="button-primary">
            View all {data.length} cast
          </button>
        }
      </div>
    )
  }
}

export default Cast