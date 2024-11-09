import { findIntervals } from './utils.js'
import { db } from './db.js'

export const routes = [
  {
    method: 'GET',
    path: '/awards/intervals',
    handler: (_, res) => {
      const awardsByProducer = {}
      const query = db.prepare('SELECT producer, year FROM movies ORDER BY year')
      const data = query.all()
      data.forEach(({ producer, year }) => {
        if (!awardsByProducer[producer]) {
          awardsByProducer[producer] = []
        }
        awardsByProducer[producer].push(year)
      })
      const result = findIntervals(awardsByProducer)
      return res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(result))
    }
  }
]
