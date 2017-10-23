import { createAction } from 'redux-actions'
import actionTypes from './_action-types'

const nowPlaying = createAction(actionTypes.NOW_PLAYING)
const tvList = createAction(actionTypes.TV_LIST)
const movies = createAction(actionTypes.MOVIES)
const search = createAction(actionTypes.SEARCH)
const person = createAction(actionTypes.PERSON)
const tv = createAction(actionTypes.TV)
const season = createAction(actionTypes.SEASON)
const offline = createAction(actionTypes.OFFLINE)

export default {
  nowPlaying,
  tvList,
  movies,
  search,
  person,
  tv,
  season,
  offline,
}
