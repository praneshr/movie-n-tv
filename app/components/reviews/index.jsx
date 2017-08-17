import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import globalStyles from 'global-styles'
import reactEasyBind from 'react-easy-bind'
import styles from './styles'
import Truncate from '../truncate'

@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
@reactEasyBind
class Reviews extends Component {

  render() {
    const {
      data,
    } = this.props
    const reviews = data.map((review) => {
      return <div styleName="col-xs-12 review">
        <div styleName="author"><b>{review.author}</b> says...</div>
        <Truncate limit={400} text={review.content} />
      </div>
    })
    return (
      <div styleName="reviews">
        <div styleName="row">
          {
            reviews.length > 0
              ? reviews
              : <div styleName="col-xs-12">
                No reviews yet!
              </div>
          }
        </div>
      </div>
    )
  }
}

export default Reviews