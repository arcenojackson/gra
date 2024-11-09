import { createServer } from 'node:http'
import { routes } from './routes.js'
import './start.js'

createServer()
  .listen('3333', () => console.log('Server running on :3333'))
  .on('request', (req, res) => {
    const { method, url } = req
    const route = routes.find(route => route.method === method && route.path.match(url))
    if (route) return route.handler(req, res)
    return res.writeHead(404).end()
  })
