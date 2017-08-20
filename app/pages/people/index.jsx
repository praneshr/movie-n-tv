import React, { Component } from 'react'
import { connect } from 'react-redux'
import ImageProgressive from 'react-progressive-bg-image'
import ReactCSS from 'react-css-modules'
import globalStyles from 'global-styles'

import { imageBase } from '../../APIs/config/'
import { uiStates, uiActions } from '../../redux-connect'
import styles from './styles'
import Details from '../../components/person-details/async'
import DetailsSkeleton from '../../components/person-details-skeleton'


@connect(uiStates, uiActions)
@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
class People extends Component {

  componentDidMount () {
    const {
      params: {
        id,
      },
      ui: {
        person,
      },
    } = this.props

    if (!person[id]) {
      this.props.actions.getPerson(id, {
        append_to_response: 'movie_credits,images,external_ids',
      })
      .then(({ data }) => {
        this.props.actions.person({
          [id]: data,
        })
      })
    }
  }

  getleftPane(personData) {
    return <ImageProgressive
      className={styles['poster-img']}
      placeholder={`${imageBase}/w92${personData.profile_path}`}
      src={`${imageBase}/w500${personData.profile_path}`}
    />
  }

  random(max) {
    return Math.floor(Math.random() * (max));
  }

  render() {
    const {
      ui: {
        person,
      },
      params: {
        id,
      },
    } = this.props
    const personData = person[id]
    const backdrop = personData
      && personData.images
      && (
        personData.images.profiles.length > 0
          ? personData.images.profiles[this.random(personData.images.profiles.length)].file_path
          : personData.profile_path
      )
    return (
      <div styleName="people">
        <div styleName="banner">
          <div styleName="image-container">
            {
              personData
              && <img src={`${imageBase}/w342${backdrop}`} alt=""/>
            }
          </div>
          <div styleName="fade-out"></div>
        </div>
        <div styleName="content container">
          <div styleName="row content">
            <div styleName="col-md-4 col-xs-9">
              <div styleName="poster">
                {
                  personData
                  ? this.getleftPane(personData)
                  : <div styleName="skeleton-placeholder poster-img placeholder" />
                }
              </div>
            </div>
            <div styleName="col-md-8 col-xs-12">
              {
                personData
                  ? <Details data={personData} />
                  : <DetailsSkeleton />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default People