import { DatabaseSync } from 'node:sqlite'
const db = new DatabaseSync(':memory:')

db.exec(`
  CREATE TABLE movies(
    id TEXT PRIMARY KEY,
    year INTEGER,
    title TEXT,
    studios TEXT,
    producers TEXT,
    winner INTEGER
  ) STRICT
`)
export { db }
