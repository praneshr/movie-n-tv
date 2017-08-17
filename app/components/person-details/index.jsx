import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import globalStyles from 'global-styles'
import truncate from 'lodash/truncate'
import reactEasyBind from 'react-easy-bind'
// import cn from 'classnames'
import { resolveUrl } from '../../utils'
import styles from './styles'
// import Genres from '../genres'
import Images from '../image-grid'
import MovieCard from '../movie-cards'

@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
@reactEasyBind
class PersonDetails extends Component {

  constructor() {
    super()
    this.state = {
      showAll: false,
    }
  }

  showAll() {
    this.setState({
      showAll: true,
    })
  }

  compare(a, b) {
    if (a.vote_average > b.vote_average) return -1
    if (a.vote_average < b.vote_average) return 1
    return 0
  }

  render() {
    const {
      data,
    } = this.props
    return (
      <div styleName="details">
        <div styleName="title">
          {data.name}
        </div>
        {
          data.also_known_as.length > 0
          && <div styleName="also">
            Also known as <b>{data.also_known_as.join(', ')}</b>
          </div>
        }
        <div styleName="bio">
          {
            this.state.showAll
              ? data.biography
              : truncate(data.biography, {
                length: 800,
              })
          }
          {
            !this.state.showAll
            && !(data.biography.length < 800)
            && <span
              onClick={this.showAll}
              styleName="link-primary">
              Read More
            </span>
          }
        </div>
        <div styleName="images">
          <h2>Photos</h2>
          <Images
            limit={10}
            data={data.images.profiles} />
        </div>
        <div styleName="images">
          <h2>Appears in</h2>
          <MovieCard
            limit={5}
            type="thumbnail"
            resolveLink={resolveUrl}
            results={data.movie_credits.cast.sort(this.compare)} />
        </div>
      </div>
    )
  }
}

export default PersonDetails