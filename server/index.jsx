import 'babel-register'

import _ from 'lodash'
import config from 'config'
import express from 'express'
import path from 'path'
import wds from 'webpack-dev-middleware'
import webpack from 'webpack'
import whm from 'webpack-hot-middleware'
import React from 'react'
import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import store from '../app/store'
import routes from '../app/router'
import HTML from './html'

const webpackConfig = _.omit(config.webpack.browser, 'watch')
const serverConfig = config.server
const app = express()
app.use(express.static(path.join(__dirname, 'build')))
if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig)

  app.use(wds(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }))

  app.use(whm(compiler))
}

app.get(['/', '/movies', '/movies/*', '/search'], (req, res) => {
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
    const content = renderToString(
      <Provider store={store()}>
        <AppContainer>
          <RouterContext {...renderProps} />
        </AppContainer>
      </Provider>,
    )

    const str = HTML(content)

    // store = createStore(allReducers,initialState)
    // initialState = store.getState() //JSON.stringify(store.getState())
    // if (renderProps) {
    // }
    return res.send(str)
  })
})

app.listen(serverConfig.port, () => {
  console.log(`Listening at http://localhost:${serverConfig.port}/`)
})
