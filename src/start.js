import { resolve } from 'node:path'
import readline from 'node:readline'
import { readFileSync } from 'node:fs'
import { Readable } from 'node:stream'
import { randomUUID } from 'node:crypto'
import { db } from './db.js'

const file = readFileSync(resolve('test/movies.csv'))
const readableFile = new Readable()
readableFile.push(file)
readableFile.push(null)
const fileLines = readline.createInterface({
  input: readableFile
})
const insert = db.prepare('INSERT INTO movies (id, title, producer, year) VALUES (?, ?, ?, ?)')
for await (const line of fileLines) {
  const [title, producer, year] = line.split(',')
  insert.run(randomUUID(), title, producer, year)
}
