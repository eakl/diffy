'use strict'

/*
* https://www.dyclassroom.com/dynamic-programming/longest-common-subsequence
* https://www.ics.uci.edu/~eppstein/161/960229.html
*/

const { equal } = require('../helpers/equal')

// const arr1 = ['google', 'apple', 'facebook', 'amazon', 'microsoft']
// const arr2 = ['google', 'microsoft', 'apple', 'airbnb', 'amazon', 'uber']
// ['google', 'apple', 'amazon']

function lcs (arr1, arr2) {
  let len1 = arr1.length
  let len2 = arr2.length
  const maxLen = Math.max(len1, len2)
  const table = [ ]
  const LCS = [ ]
  const LCSIdx1 = [ ] // Index array 1
  const LCSIdx2 = [ ] // Index array 2

  // Initialize a table of zeros
  for (let i = 0; i <= maxLen; ++i) {
    table.push([ ])
    for (let j = 0; j <= maxLen; ++j) {
      table[i][j] = 0
    }
  }

  // Fill the table with lcs count
  for (let i = 1; i < len1; ++i) {
    for (let j = 1; j < len2; ++j) {
      if (equal(arr1[i - 1], arr2[j - 1])) {
        table[i][j] = table[i - 1][j - 1] + 1
      }
      else {
        table[i][j] = Math.max(table[i - 1][j], table[i][j - 1])
      }
    }
  }

  // Move backward along the table to find the LCS
  while (len1 > 0 && len2 > 0) {
    if (equal(arr1[len1 - 1], arr2[len2 - 1])) {
      LCS.push(arr1[len1 - 1])
      LCSIdx1.push(len1 - 1)
      LCSIdx2.push(len2 - 1)
      len1 -= 1
      len2 -= 1
    }
    else {
      if (table[len1][len2 - 1] >= table[len1 - 1][len2]) {
        len2 -= 1
      }
      else {
        len1 -= 1
      }
    }
  }

  return {
    lcsS: LCS.reverse(),
    lcsI1: LCSIdx1.reverse(),
    lcsI2: LCSIdx2.reverse()
  }
}




// const arr3 = ['The', 'cat', 'in', 'the', 'hat']
// const arr4 = ['The', 'cat', 'in', 'the', 'hat']



// console.log(lcs(arr1, arr2))
// console.log(lcs('hahaha', 'hovohhoa'))


module.exports = {
  lcs
}
