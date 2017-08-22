import { Redirect, Route, Router, browserHistory } from 'react-router'
import React from 'react'
import Layout from './layout'
import Movies from './pages/movies'
import Movie from './pages/movie'
import Search from './pages/search'
import People from './pages/people'
import Tv from './pages/tv'
import Episodes from './pages/tv-episodes'

export default () => (
  <Router
    onUpdate={() => window.scrollTo(0, 0)}
    history={browserHistory}>
    <Redirect from="/" to="/movies" />
    <Route path="/" component={Layout}>
      <Route
        path="movies"
        component={Movies}
      />
      <Route
        path="movies/:id/:name"
        component={Movie}
      />
      <Route
        path="tv/:id/:name"
        component={Tv}
      />
      <Route
        path="tv/:id/seasons/:seasonId"
        component={Episodes}
      />
      <Route
        path="/search"
        component={Search}
      />
      <Route
        path="/people/:id"
        component={People}
      />
    </Route>
  </Router>
)
