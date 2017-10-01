import { encode } from './'

const resolveUrl = (result) => {
  switch (result.media_type) {
    case 'tv':
      return `/tv/${result.id}`
    case 'person':
      return `/people/${result.id}`
    default:
      return `/movies/${result.id}`
  }
}

export default resolveUrl
