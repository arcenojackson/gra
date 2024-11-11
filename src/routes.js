import { findIntervals } from './utils.js'
import { db } from './db.js'

export const routes = [
  {
    method: 'GET',
    path: '/producers/awards/intervals',
    handler: (_, res) => {
      const awardsByProducer = {}
      const query = db.prepare('SELECT producers, year FROM movies WHERE winner = 1 ORDER BY year')
      const data = query.all()
      data.forEach(({ producers, year }) => {
        if (!awardsByProducer[producers]) {
          awardsByProducer[producers] = []
        }
        awardsByProducer[producers].push(year)
      })
      const result = findIntervals(awardsByProducer)
      return res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(result))
    }
  }
]
