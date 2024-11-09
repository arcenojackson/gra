import { strict as assert } from 'assert'

const expectedResponse = {
  min: [
    {
      producer: "Producer 1",
      interval: 1,
      previousWin: 2008,
      followingWin: 2009
    },
    {
      producer: "Producer 2",
      interval: 1,
      previousWin: 2018,
      followingWin: 2019
    }
  ],
  max: [
    {
      producer: "Producer 1",
      interval: 99,
      previousWin: 1900,
      followingWin: 1999
    }
  ]
}

function normalize(obj) {
  const normalized = JSON.stringify(obj, Object.keys(obj).sort())
  return JSON.parse(normalized)
}

function deepEqualValues(obj1, obj2) {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return obj1 === obj2
  }
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  if (keys1.length !== keys2.length) return false
  return keys1.every(key => deepEqualValues(obj1[key], obj2[key]))
}

const integrationTest = async () => {
  try {
    const response = await fetch('http://localhost:3333/awards/intervals')
    const result = await response.json()
    assert.ok(deepEqualValues(normalize(result), normalize(expectedResponse)), 'A resposta da API não corresponde ao esperado.')
    console.log('Teste passou! A resposta da API está correta.')
  } catch (error) {
    console.error('Teste falhou:', error.message)
  }
}

integrationTest()
