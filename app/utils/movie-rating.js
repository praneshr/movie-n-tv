const rateVoteAverage = (vote) => {
  if (vote < 5) {
    return 'bad'
  }
  if (vote < 7) {
    return 'average'
  }
  return 'good'
}

export default rateVoteAverage
