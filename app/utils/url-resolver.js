const resolveUrl = (result) => {
  switch (result.media_type) {
    case 'tv':
      return ''
    case 'person':
      return `/people/${result.id}`
    default:
      return `/movies/${result.id}/${btoa(unescape(encodeURIComponent(result.title || '')))}`
  }
}

export default resolveUrl