import React, { Component } from 'react'
import ReactImages from 'react-images'
import LazyLoad from 'react-lazyload'
import ImageProgressive from 'react-progressive-bg-image'
import reactEasyBind from 'react-easy-bind'
import ReactCSS from 'react-css-modules'
import globalStyles from 'global-styles'
import { imageBase } from '../../APIs/config'
import styles from './styles'

@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
@reactEasyBind
class componentName extends Component {

  constructor() {
    super()
    this.state = {
      image: 0,
      show: false,
      showAll: false,
    }
  }

  handleShowAll() {
    this.setState({
      showAll: true,
    })
  }

  onNext() {
    this.setState({
      image: this.state.image + 1,
    })
  }

  onBack() {
    this.setState({
      image: this.state.image - 1,
    })
  }

  onClose() {
    this.setState({
      image: 0,
      show: false,
    })
  }

  onClickThumbnail(i) {
    this.setState({
      image: i,
      show: true,
    })
  }

  render() {
    const {
      data,
      limit,
    } = this.props
    const img = data.map((x) => {
      return {
        src: `${imageBase}/original${x.file_path}`,
      }
    })
    const pimg = data.map((x, i) => {
      if (i >= limit && !this.state.showAll) return undefined
      return <div styleName="col-xs-6 col-sm-3" key={i}>
        <div
          styleName="img-container"
          onClick={this.easyBind(this.onClickThumbnail, i)}>
          <LazyLoad
            placeholder={<div styleName="thumbnail" />}
            offset={100}
            once
          >
            <ImageProgressive
              className={styles.thumbnail}
              placeholder={`${imageBase}/w45${x.file_path}`}
              src={`${imageBase}/w342${x.file_path}`}
            />
          </LazyLoad>
        </div>
      </div>
    })
    return (
      <div>
        <div styleName="row">
          {pimg}
          <ReactImages
            className="light-box"
            onClose={this.onClose}
            onClickThumbnail={this.onClickThumbnail}
            currentImage={this.state.image}
            onClickNext={this.onNext}
            onClickPrev={this.onBack}
            backdropClosesModal
            showCloseButton={false}
            showThumbnails
            images={img}
            isOpen={this.state.show} />
        </div>
        {
          data.length > limit
          && !this.state.showAll
          && <button
            onClick={this.handleShowAll}
            styleName="button-primary">
            View all {data.length} photos
          </button>
        }
      </div>
    )
  }
}

export default componentName