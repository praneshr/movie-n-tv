import { APIs } from '../app/APIs'

let timerId

const getLatestMovies = (ref) => {
  if (timerId) {
    clearInterval(timerId)
  }
  APIs.getNowPlaying()()
  .then(({ data }) => {
    Object.assign(ref, data)
  })
  .catch((err) => {
    console.log(err)
  })
  timerId = setInterval(() => getLatestMovies(ref), 10000)
}

export default getLatestMovies
