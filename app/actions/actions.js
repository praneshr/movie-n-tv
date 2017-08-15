import { createAction } from 'redux-actions'
import actionTypes from './_action-types'

const nowPlaying = createAction(actionTypes.NOW_PLAYING)
const movies = createAction(actionTypes.MOVIES)
const search = createAction(actionTypes.SEARCH)

export default {
  nowPlaying,
  movies,
  search,
}
