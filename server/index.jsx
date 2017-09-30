import 'babel-register'
import _ from 'lodash'
import config from 'config'
import express from 'express'
import path from 'path'
import React from 'react'
import exphbs from 'express-handlebars'
import compression from 'compression'
import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import WithStyles from '../app/with-style-context'
import store from '../app/store'
import routes from '../app/router'

const app = express()

app.disable('x-powered-by')
app.use(compression({
  threshold: 0,
  filter: () => true,
}))
app.engine('.hbs', exphbs({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './build')

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const wds = require('webpack-dev-middleware')
  const whm = require('webpack-hot-middleware')
  const wconfig = require('../config/webpack/default.js')
  app.use(express.static(path.join(__dirname, 'build')))
  const webpackConfig = _.omit(wconfig, 'watch')
  webpackConfig.plugins.reverse().pop()
  const compiler = webpack(webpackConfig)

  app.use(wds(compiler, {
    publicPath: webpackConfig.output.publicPath,
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
  match({ routes: routes(), location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    // let markup,
    // store,
    // initialState = {todoReducer:
    //     {
    //         items: [{id:0,text:"Initial State To do Item",editItem:false,completed:false}]
    //     }
    // }

    const css = []

    const content = renderToString(
      <Provider store={store()}>
        <AppContainer>
          <WithStyles onInsertCss={styles => css.push(styles._getCss())}>
            <RouterContext {...renderProps} />
          </WithStyles>
        </AppContainer>
      </Provider>,
    )

    // store = createStore(allReducers,initialState)
    // initialState = store.getState() //JSON.stringify(store.getState())
    // if (renderProps) {
    // }
    return res.render('index', {
      criticalCSS: css.join(''),
      html: content,
    })
  })
})

app.listen(process.env.PORT || config.port, () => {
  console.log(`Listening at http://localhost:${config.port}/`)
})
