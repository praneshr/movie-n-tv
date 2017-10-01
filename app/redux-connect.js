import { bindActionCreators } from 'redux'
import { actions } from './actions'
import { APIs } from './APIs/'

const uiStates = states => ({
  ui: states,
})

const uiActions = dispatch => ({
  actions: bindActionCreators({
    ...actions,
    ...APIs,
  }, dispatch),
})

export {
  uiStates,
  uiActions,
}
