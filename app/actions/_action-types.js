const actionTypes = [
  'SAMPLE',
  'NOW_PLAYING',
  'MOVIES',
  'SEARCH',
  'PERSON',
  'TV',
  'SEASON',
  'OFFLINE',
  'TV_LIST',
]

export default actionTypes.reduce((obj, str) => {
  const mirror = {
    [str]: str,
  }
  return { ...obj, ...mirror }
}, {})
