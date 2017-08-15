import axios from 'axios'
import * as config from './config'


/*
Don't dispatch any actions here. Do it at the component level. It brings more
clarity on what's happening.
This file should be a collection of pure async functions.
*/

export const getSearch = q => () => axios(config.search(q))
export const getNowPlaying = q => () => axios(config.nowPlaying(q))
export const getMovie = (id, q) => () => axios(config.movie(id, q))
