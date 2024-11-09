export function findIntervals(awards) {
  const intervals = {
    min: [],
    max: []
  }
  let minInterval = Infinity
  let maxInterval = 0
  for (const producer in awards) {
    const years = awards[producer].sort((a, b) => a - b)
    for (let i = 1; i < years.length; i++) {
      const interval = years[i] - years[i - 1]
      if (interval < minInterval) {
        minInterval = interval
        intervals.min = [{ producer, interval, previousWin: years[i - 1], followingWin: years[i] }]
      } else if (interval === minInterval) {
        intervals.min.push({ producer, interval, previousWin: years[i - 1], followingWin: years[i] })
      }
      if (interval > maxInterval) {
        maxInterval = interval
        intervals.max = [{ producer, interval, previousWin: years[i - 1], followingWin: years[i] }]
      } else if (interval === maxInterval) {
        intervals.max.push({ producer, interval, previousWin: years[i - 1], followingWin: years[i] })
      }
    }
  }
  return intervals
}
