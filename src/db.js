import { DatabaseSync } from 'node:sqlite'
const db = new DatabaseSync(':memory:')

db.exec(`
  CREATE TABLE movies(
    id TEXT PRIMARY KEY,
    title TEXT,
    producer TEXT,
    year INTEGER
  ) STRICT
`)
export { db }
