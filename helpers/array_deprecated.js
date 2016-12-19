'use strict'

const { equal } = require('./index')

// Return the index of the first element of the sub array contained in the master array
function arrayCountainSubIdx(master, sub, iM, iS, iFound, next) {
  if (iS < sub.length) {
    if (next) {
      return arrayCountainSubIdx(master, sub, iM + 1, iS + 1, iFound, equal(sub[iS], master[iM]))
    }
    const i = master.indexOf(sub[iS], iM)

    if (i !== -1) {
      iFound += i
      return arrayCountainSubIdx(master, sub, iFound + 1, iS + 1, iFound, true)
    }
  }

  return next ? iFound : -1
}

function twoEdits2 (arr1, arr2) {
  const hm = halfMatch(arr1, arr2)

  if (hm) {
    // A half-match was found, sort out the return data.
    const arr11 = hm[0]
    const arr12 = hm[1]
    const arr21 = hm[2]
    const arr22 = hm[3]
    const midCommon = hm[4]

    console.log(arr11)
    console.log(arr12)
    console.log(arr21)
    console.log(arr22)

    // Send both pairs off for separate processing.
    const diffs1 = diff_main(arr11, arr21)
    const diffs2 = diff_main(arr12, arr22)

    // Merge the results.
    return diffs1.concat([['DIFF_EQUAL', midCommon]], diffs2)
  }
  else {
    return null
  }
}

function halfMatch(arr1, arr2) {
  // Do the two arrays share a subarray which is at least half the length of the
  // longer array?
  const long = arr1.length >= arr2.length ? arr1 : arr2
  const short = arr1.length >= arr2.length ? arr2 : arr1

  if (long.length < 10 || short.length < 1) {
    return null
  }

  // First check if the second quarter is the seed for a half-match.
  const hm1 = _halfMatch(long, short, Math.ceil(long.length / 4))
  // Check again based on the third quarter.
  const hm2 = _halfMatch(long, short, Math.ceil(long.length / 2))

  let hm = [ ]
  if (!hm1 && !hm2) {
    return null
  }
  else if (!hm2) {
    hm = hm1
  }
  else if (!hm1) {
    hm = hm2
  }
  else {
    // Both matched. Select the longest.
    hm = hm1[4].length >= hm2[4].length ? hm1 : hm2
  }

  // A half-match was found, sort out the return data.
  let arr11 = [ ]
  let arr12 = [ ]
  let arr21 = [ ]
  let arr22 = [ ]

  if (arr1.length > arr2.length) {
    arr11 = hm[0]
    arr12 = hm[1]
    arr21 = hm[2]
    arr22 = hm[3]
  } else {
    arr21 = hm[0]
    arr22 = hm[1]
    arr11 = hm[2]
    arr12 = hm[3]
  }
  const midCommon = hm[4]
  return [arr11, arr12, arr21, arr22, midCommon]
}

function _halfMatch(long, short, i) {
  // Start with a 1/4 length subarray block at position i (1/4 or 1/2 offset) as a seed.
  const seed = long.slice(i, i + Math.floor(long.length / 4))
  let j = arrayCountainSubIdx(short, seed, j + 1, 0, 0, false)
  let longEdit1 = [ ]
  let longEdit2 = [ ]
  let shortEdit1 = [ ]
  let shortEdit2 = [ ]
  let common = [ ]

  // j = the beginning of the subarray in the long array
  while (j !== -1) {
    // commonHead of the second part of the array
    const headIndex = headIdx(long.slice(i), short.slice(j))
    // commonTail of the first part of the array
    const tailIndex = tailIdx(long.slice(0, i), short.slice(0, j))

    // common should have the same length as the tail array + the head array (= the subarray)
    if (common.length < tailIndex + headIndex) {
      // From beginning of 1st part minus commonTail
      longEdit1 = long.slice(0, i - tailIndex)
      // From beginning of 2nd part minus commonHead
      longEdit2 = long.slice(i + headIndex + 1)
      // From beginning of 1st part minus commonTail
      shortEdit1 = short.slice(0, j - tailIndex)
      // From beginning of 2nd part minus commonHead
      shortEdit2 = short.slice(j + headIndex + 1)
      // commonTail of the 1st part + commonHead of the 2nd part
      common = short.slice(j - tailIndex, j).concat(short.slice(j, j + headIndex + 1))
    }
    j = arrayCountainSubIdx(short, seed, j + 1, 0, 0, false)
  }

  // the common subarray must be at least half the length of the longer array
  if (common.length >= long.length / 2) {
    return [longEdit1, longEdit2, shortEdit1, shortEdit2, common]
  }
  else {
    return null
  }
}

console.log(twoEdits2(['a','b','c','d','e'], ['x', 'b','c','d', 'z']))
