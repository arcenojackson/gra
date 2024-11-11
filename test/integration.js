import { strict as assert } from 'node:assert'
import { spawn, execSync } from 'node:child_process'

const expectedResponse = {
  "min": [
    {
      "producer": "Joel Silver",
      "interval": 1,
      "previousWin": 1990,
      "followingWin": 1991
    }
  ],
  "max": [
    {
      "producer": "Matthew Vaughn",
      "interval": 13,
      "previousWin": 2002,
      "followingWin": 2015
    }
  ]
}

function deepEqualValues(obj1, obj2) {
  if (obj1 === obj2) return true
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false
    return obj1.every((value, index) => deepEqualValues(value, obj2[index]))
  }
  if (typeof obj1 === 'object' && typeof obj2 === 'object' && obj1 !== null && obj2 !== null) {
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)
    if (keys1.length !== keys2.length) return false
    return keys1.every(key => deepEqualValues(obj1[key], obj2[key]))
  }
  return false
}

const integrationTest = async () => {
  try {
    const response = await fetch('http://localhost:3333/producers/awards/intervals')
    const result = await response.json()
    assert.ok(deepEqualValues(result, expectedResponse), 'A resposta da API não corresponde ao esperado.')
    console.log('Teste passou! A resposta da API está correta.')
  } catch (error) {
    console.error('Teste falhou:', error.message)
  }
}

spawn('node', ['--experimental-sqlite', 'src/main.js', 'test/test-file.csv'], { shell: true })

setTimeout(() => {
  integrationTest()
}, 1000)

setTimeout(() => {
  execSync('lsof -ti :3333 | xargs kill -9 > /dev/null')
}, 3000)
