'use strict'

// =========
// Test Data
// =========

const before = {
  _id: 'user1',
  group: [
    { _id: 'group1', tags: ['drink', 'food'] },
    { _id: 'group2', tags: ['fun', 'party'] }
  ],
  is_active: true,
  __v: 0
}

const after = {
  _id: 'user1',
  group: [
    { _id: 'group1', tags: ['drink', 'food'] },
    { _id: 'group2', tags: ['fun'] },
    { _id: 'group3', tags: [] }
  ],
  rewards: [],
  is_active: true,
  __v: 1
}

const original = ['google', 'apple', 'facebook', 'amazon']
const identical = ['google', 'apple', 'facebook', 'amazon']
const del = ['google', 'apple', 'facebook']
const add = ['google', 'apple', 'facebook', 'amazon', 'microsoft']
const move = ['amazon', 'google', 'apple', 'facebook']
const replace = ['google', 'microsoft', 'facebook', 'amazon']

const arrO = [
  { _id: 'el', name: 'google' },
  { _id: 'th', name: 'apple' },
  { _id: 'ha', name: 'facebook' },
  { _id: 'hu', name: 'amazon' }
]
