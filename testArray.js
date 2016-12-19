'use strict'

const { arrayToMap } = require('./helpers')

const original = ['google', 'apple', 'facebook', 'amazon']
const identical = ['google', 'apple', 'facebook', 'amazon']
const del = ['google', 'apple', 'facebook']
const add = ['google', 'apple', 'facebook', 'amazon', 'microsoft']
const move = ['amazon', 'google', 'apple', 'facebook']
const replace = ['google', 'microsoft', 'facebook', 'amazon']

const arr1 = ['google', 'apple', 'facebook', 'amazon', 'microsoft']
const arr2 = ['google', 'microsoft', 'apple', 'airbnb', 'amazon', 'uber']
// Del 'facebook' 2
// Add 'uber' 3
// Move 'microsoft' 4 - 1


const set1 = new Set(arr1)
const set2 = new Set(arr2)
const union = new Set([ ...set1, ...set2 ])
const intersection = new Set([ ...set1 ].filter(x => set2.has(x)))
const insert = new Set([ ...set2 ].filter(x => !set1.has(x)))
const delet = new Set([ ...set1 ].filter(x => !set2.has(x)))

console.log('union=', union)
console.log('intersection=', intersection)
console.log('insert=', insert)
console.log('del=', delet)

const max = (arr1, arr2) => (arr1.length > arr2.length) ? arr1 : arr2

function lcs (arr1, arr2, i1 = 0, i2 = 0) {
  if (i1 > arr1.length || i2 > arr2.length) {
    return 0
  }
  else if (arr1[i1] === arr2[i2]) {
    return 1 + lcs(arr1, arr2, i1+1, i2+1)
  }
  else {
    return max(lcs(arr1, arr2, i1+1, i2), lcs(arr1, arr2, i1, i2+1))
  }
}

console.log(lcs(arr1, arr2))


function lcs2 (arr1, arr2) {
  let m = []
  for (let i1 = 0; i1 < arr1.length; ++i1) {
    for (let i2 = 0; i2 < arr1.length; ++i2) {
      m[i2][i1] = -1
    }
  }
  return indice(0, 0)
}

function indice (i1, i2) {
  if (m[i2][i1] < 0) {
    if (i1 > arr1.length || i2 > arr2.length) {
      return 0
    }
    else if (arr1[i1] === arr2[i2]) {
      return 1 + indice(i1+1, i2+1)
    }
    else {
      return max(indice(i1+1, i2), indice(i1, i2+1))
    }
  }
  return m[i2][i1]
}

console.log(lcs2(arr1, arr2))
