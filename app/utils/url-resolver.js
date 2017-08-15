const resolveUrl = (result) => {
  switch (result.media_type) {
    case 'movie':
      return `/movies/${result.id}/${btoa(unescape(encodeURIComponent(result.title || '')))}`
    default:
      return ''
  }
}

export default resolveUrl