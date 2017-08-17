import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import truncate from 'lodash-es/truncate'
import globalStyles from 'global-styles'
import reactEasyBind from 'react-easy-bind'
import styles from './styles'

@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
@reactEasyBind
class Reviews extends Component {

  constructor() {
    super()
    this.state = {
      showAll: false,
    }
  }

  handleShowFull() {
    this.setState({
      showAll: true,
    })
  }

  render() {
    const {
      limit = 100,
      text,
    } = this.props
    return (
      <p>
        {
          this.state.showAll
            ? text
            : truncate(text, {
              length: limit,
            })
        }
        {
          text.length > limit
          && !this.state.showAll
          && <span
            styleName="link-primary read-more"
            onClick={this.handleShowFull}
          >Read more</span>
        }

      </p>
    )
  }
}

export default Reviews