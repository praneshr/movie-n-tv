import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import reducers from '../reducers/'

export default function configureStore() {
  const store = createStore(reducers, compose(
    applyMiddleware(thunk),
  ))
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers/', () => {
      /* eslint global-require: 0 */
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
