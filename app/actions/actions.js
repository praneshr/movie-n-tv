import { createAction } from 'redux-actions'
import actionTypes from './_action-types'

const nowPlaying = createAction(actionTypes.NOW_PLAYING)
const movies = createAction(actionTypes.MOVIES)
const search = createAction(actionTypes.SEARCH)
const person = createAction(actionTypes.PERSON)
const tv = createAction(actionTypes.TV)
const season = createAction(actionTypes.SEASON)
const offline = createAction(actionTypes.OFFLINE)

export default {
  nowPlaying,
  movies,
  search,
  person,
  tv,
  season,
  offline,
}
