import { Redirect, Route, Router, browserHistory } from 'react-router'
import React from 'react'
import Layout from './layout'
import NotFound from './components/not_found/'
import Movies from './pages/movies'
import Movie from './pages/movie'
import Search from './pages/search'

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
        path="/search"
        component={Search}
      />
    </Route>
  </Router>
)
