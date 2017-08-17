const actionTypes = [
  'SAMPLE',
  'NOW_PLAYING',
  'MOVIES',
  'SEARCH',
  'PERSON',
]

export default actionTypes.reduce((obj, str) => {
  const mirror = {
    [str]: str,
  }
  return { ...obj, ...mirror }
}, {})
