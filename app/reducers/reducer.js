import { handleActions } from 'redux-actions'

import actionTypes from '../actions/_action-types'
import { createState } from './utils'

const initialState = {
  sample: 'sample',
  movies: { },
  search: { },
  person: { },
  tv: { },
  season: { },
}

/*
createState is a utility function which helps to the combine new state and the
previous state.
See './utils/createState.js'
*/

const reducer = handleActions({
  [actionTypes.NOW_PLAYING]: (state, { payload }) =>
    createState(state, payload, 'nowPlaying'),
  [actionTypes.TV_LIST]: (state, { payload }) =>
    createState(state, payload, 'tvList'),
  [actionTypes.MOVIES]: (state, { payload }) => {
    const existingMovies = { ...state.movies }
    const newMovies = { ...existingMovies, ...payload }
    return createState(state, newMovies, 'movies')
  },
  [actionTypes.SEARCH]: (state, { payload }) => {
    const existingSearch = { ...state.search }
    const newSearch = { ...existingSearch, ...payload }
    return createState(state, newSearch, 'search')
  },
  [actionTypes.PERSON]: (state, { payload }) => {
    const existingPerson = { ...state.person }
    const newSearch = { ...existingPerson, ...payload }
    return createState(state, newSearch, 'person')
  },
  [actionTypes.TV]: (state, { payload }) => {
    const existingTv = { ...state.person }
    const newSearch = { ...existingTv, ...payload }
    return createState(state, newSearch, 'tv')
  },
  [actionTypes.SEASON]: (state, { payload }) => {
    const existingSeason = { ...state.person }
    const newSearch = { ...existingSeason, ...payload }
    return createState(state, newSearch, 'season')
  },
  [actionTypes.OFFLINE]: (state, { payload }) =>
    createState(state, payload, 'offline'),
}, {})

export default reducer
