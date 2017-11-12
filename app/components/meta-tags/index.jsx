import React, { Component } from 'react'
import { imageBase } from '../../APIs/config/'

class MetaTags extends Component {
  render() {
    const data = this.props.data
    const type = this.props.type
    return [
      <meta name="description" content={data.overview} />,
      <meta content={`${imageBase}/w500${data.poster_path || data.profile_path }`} property="og:image" />,
      <meta content="Box Office" property="og:site_name" />,
      <meta content="object" property="og:type" />,
      <meta content={data.title || data.name} property="og:title" />,
      <meta content={`https://themovientv.com/${type}/${data.id}`} property="og:url" />,
      <meta content={data.overview || data.biography} property="og:description" />,
      <meta name="twitter:card" value="summary_large_image" />,
      <meta name="twitter:site" value="@pranesh_ravi" />,
      <meta name="twitter:creator" value="@pranesh_ravi" />,
      <meta name="twitter:title" content={data.title || data.name} />,
      <meta name="twitter:description" content={data.overview || data.biography} />,
      <meta name="twitter:image" content={`${imageBase}/w500${data.poster_path || data.profile_path }`} />,
      <meta name="twitter:label1" content="Rating" />,
      <meta name="twitter:value1" content={`${data.vote_average.toFixed(1)}/10`} />,
      type === 'movie' && <meta name="twitter:label2" content="Year" />,
      type === 'movie' && <meta name="twitter:value2" content={`${data.release_date.split('-')[0]}`} />,
    ]
  }
}

export default MetaTags
