/**
 * Combine previous and new state and return latest state.
 * @param {Object} state - Previous state.
 * @param {*} payload - New state value.
 * @param {string} key - Key for the new state.
 */
export default (state, payload, key) => {
  const newState = {}
  newState[key] = payload
  return { ...state, ...newState }
}
