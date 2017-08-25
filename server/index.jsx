import 'babel-register'
import _ from 'lodash'
import config from 'config'
import express from 'express'
import path from 'path'
import React from 'react'
import wds from 'webpack-dev-middleware'
import webpack from 'webpack'
import whm from 'webpack-hot-middleware'
import compression from 'compression'
import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import WithStyles from '../app/with-style-context'
import store from '../app/store'
import routes from '../app/router'
import HTML from './html'

const serverConfig = config.get('server')

const app = express()

app.disable('x-powered-by')
app.use(compression())

if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname, 'build')))
  const webpackConfig = _.omit(config.get('webpack.browser'), 'watch')
  webpackConfig.plugins.reverse().pop()
  const compiler = webpack(webpackConfig)

  app.use(wds(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }))

  app.use(whm(compiler))
} else {
  app.use(express.static(path.join(__dirname, 'build'), {
    etag: false,
    index: false,
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

    const str = HTML(content, css)

    // store = createStore(allReducers,initialState)
    // initialState = store.getState() //JSON.stringify(store.getState())
    // if (renderProps) {
    // }
    return res.send(str)
  })
})

app.listen(process.env.PORT || serverConfig.port, () => {
  console.log(`Listening at http://localhost:${serverConfig.port}/`)
})
