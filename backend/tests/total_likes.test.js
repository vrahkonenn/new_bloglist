const { test, describe } = require('node:test')
const assert = require('node:assert')

const totalLikes = require('../utils/list_helper').totalLikes

describe('total likes', () => {

  const emptyList = []

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const biggerList = [
    {
      "title": "React patterns",
      "author": "Michael Chan",
      "url": "https://reactpatterns.com/",
      "likes": 7,
      "id": "68697cfae758b1900fc0d100"
    },
    {
      "title": "Go To Statement Considered Harmful",
      "author": "Edsger W. Dijkstra",
      "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      "likes": 5,
      "id": "68697d5ee758b1900fc0d102"
    }
  ]

  test('when list is empty total likes is zero', () => {
    const result = totalLikes(emptyList)
    assert.strictEqual(result, 0)

  })
  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
  test('of a bigger list is calculated rigth', () => {
    const result = totalLikes(biggerList)
    assert.strictEqual(result, 12)
  })
})