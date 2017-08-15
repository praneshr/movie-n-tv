import { stringify } from 'qs'

export const baseUrl = 'https://api.themoviedb.org/3'

export const imageBase = 'https://image.tmdb.org/t/p'

const qp = (params = {}) => {
  const key = {
    api_key: '498782bfe8f76a62297d11aca7c8693c',
  }
  return stringify({ ...params, ...key })
}

export const search = query =>
  `${baseUrl}/search/multi?${qp(query)}`

export const nowPlaying = query =>
  `${baseUrl}/movie/now_playing?${qp(query)}`

export const movie = (id, query) =>
  `${baseUrl}/movie/${id}?${qp(query)}`