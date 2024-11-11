import { resolve } from 'node:path'
import readline from 'node:readline'
import { readFileSync, existsSync } from 'node:fs'
import { Readable } from 'node:stream'
import { randomUUID } from 'node:crypto'
import { db } from './db.js'

const existsFile = existsSync(resolve(process.argv[2] ?? 'movies.csv'))
if (!existsFile) {
  console.error("Por favor, forneça o caminho do arquivo CSV.")
  process.exit(1);
}
const csvFilePath = resolve(process.argv[2] ?? 'movies.csv')
const file = readFileSync(csvFilePath)
const readableFile = new Readable()
readableFile.push(file)
readableFile.push(null)
const fileLines = readline.createInterface({
  input: readableFile
})
const insert = db.prepare('INSERT INTO movies (id, year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?, ?)')
for await (const line of fileLines) {
  const [year, title, studios, producers, winner] = line.split(';')
  if (year === 'year') continue
  const producersList = producers.replace(" and ", ", ").split(", ").map(name => name.trim())
  producersList.forEach(producer => insert.run(randomUUID(), year, title, studios, producer, winner === 'yes' ? 1 : 0))
}
