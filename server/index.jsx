import 'babel-register'
import 'babel-polyfill'
import _ from 'lodash'
import config from 'config'
import express from 'express'
import path from 'path'
import React from 'react'
import Helmet from 'react-helmet'
import compression from 'compression'
import handlebars from 'handlebars'
import fs from 'fs'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import reducers from '../app/reducers'
import WithStyles from '../app/with-style-context'
import routes from '../app/router'
import latestMovies from './get-latest-movies'
import initialStore from '../app/store/initial-store'
import seo from './get-seo-data'

const preBodyTemplate = fs.readFileSync(path.resolve('./build/head.hbs'), 'utf8')
const bodyTemplate = fs.readFileSync(path.resolve('./build/body.hbs'), 'utf8')
const postBodyTemplate = fs.readFileSync(path.resolve('./build/tail.hbs'), 'utf8')

const preBody = handlebars.compile(preBodyTemplate)()
const body = handlebars.compile(bodyTemplate)
const postBody = handlebars.compile(postBodyTemplate)

const movies = {}
const cssCache = {}

latestMovies(movies)

const app = express()

app.disable('x-powered-by')
app.use(compression({
  threshold: 0,
  filter: () => true,
}))

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const wds = require('webpack-dev-middleware')
  const whm = require('webpack-hot-middleware')
  const wconfig = require('../config/webpack/default.js')
  app.use(express.static(path.join(__dirname, 'build')))
  const webpackConfig = _.omit(wconfig, 'watch')
  webpackConfig.browser.plugins.reverse().pop()
  const compiler = webpack(webpackConfig.browser)

  app.use(wds(compiler, {
    publicPath: webpackConfig.browser.output.publicPath,
  }))

  app.use(whm(compiler))
} else {
  app.use(express.static(path.join(__dirname, 'build'), {
    maxAge: Infinity,
    etag: false,
    index: false,
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'public,max-age=31556952000, immutable')
    },
  }))
}

app.get([
  '/',
  '/movies',
  '/movies/*',
  '/search',
  '/people/*',
  '/tv/*',
], (req, res) => {
  match({ routes: routes(), location: req.url }, async (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    res.writeHead(200)
    res.write(preBody)
    let data = {}

    try {
      data = await seo(renderProps.location.pathname, renderProps.params)
    } catch (e) {
      console.error(e)
      console.warn('Returing empty HTML...')
    }
    const reqpath = req.url

    const cssCached = cssCache[reqpath] !== undefined

    const css = new Set()
    const runTimeStore = { ...initialStore, ...{ banner: movies.results[0] }, ...data }
    const init = JSON.stringify(runTimeStore)
    const store = createStore(reducers, runTimeStore, applyMiddleware(thunk))

    const content = renderToString(
      <Provider store={store}>
        <AppContainer>
          <WithStyles onInsertCss={styles => !cssCached && css.add(styles._getCss())}>
            <RouterContext {...renderProps} />
          </WithStyles>
        </AppContainer>
      </Provider>,
    )
    const helmet = Helmet.renderStatic()
    if (!cssCached) {
      cssCache[reqpath] = [...css].join('')
    }

    const bodyHTML = body({
      criticalCSS: cssCache[reqpath],
      html: content,
      helmetTitle: helmet.title,
      helmetMeta: helmet.meta,
    })

    res.write(bodyHTML)
    res.write(postBody({
      init,
    }))
    res.end()
  })
})

app.listen(process.env.PORT || config.port, () => {
  console.log(`Listening at http://localhost:${config.port}/`)
})
