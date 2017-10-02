import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import globalStyles from 'global-styles'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import reactEasyBind from 'react-easy-bind'
import { resolveUrl } from '../../utils'
import styles from './styles'
import Images from '../image-grid/async'
import MovieCard from '../movie-cards/async'
import Truncate from '../truncate'

@withStyles(styles)
@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
@reactEasyBind
class PersonDetails extends Component {

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
          <Truncate limit={800} text={data.biography} />
        </div>
        <div styleName="images">
          <h2>Photos</h2>
          <Images
            limit={10}
            data={data.images ? data.images.profiles : []} />
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