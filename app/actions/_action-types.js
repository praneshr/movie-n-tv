const actionTypes = [
  'SAMPLE',
  'NOW_PLAYING',
  'MOVIES',
  'SEARCH',
]

export default actionTypes.reduce((obj, str) => {
  const mirror = {
    [str]: str,
  }
  return { ...obj, ...mirror }
}, {})
