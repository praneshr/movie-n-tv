import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import Router from './router'
import store from './store'

const registerSW = () => {
  if ('serviceWorker' in navigator) {
    navigator
      .serviceWorker
      .register('/assets/service-worker.js');
  }
}

const DefaultStore = store()

const renderNode = document.getElementById('app')

const renderIntoDOM = (Node) => {
  ReactDOM.render(
    <Provider store={DefaultStore}>
      <AppContainer>
        <Node />
      </AppContainer>
    </Provider>,
    renderNode,
  )
}

const renderPage = () => {
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./router.jsx', () => {
      /* eslint global-require: 0 */
      const NextRouter = require('./router.jsx').default
      renderIntoDOM(NextRouter)
    })
  }
  renderIntoDOM(Router)
}

registerSW()
export default renderPage()
