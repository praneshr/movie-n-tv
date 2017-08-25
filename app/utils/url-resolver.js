import { encode } from './'

const resolveUrl = (result) => {
  switch (result.media_type) {
    case 'tv':
      return `/tv/${result.id}/${encode(result.name)}`
    case 'person':
      return `/people/${result.id}`
    default:
      return `/movies/${result.id}/${encode(result.title || '')}`
  }
}

export default resolveUrl
