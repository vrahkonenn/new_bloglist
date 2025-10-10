const assert = require('node:assert')
const { test, after, beforeEach, describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('Deleting a blog', () => {

    test('Deleting blog by id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        const contents = blogsAtEnd.map(b => b.title)
        assert(!contents.includes(blogToDelete.title))

        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length -1)
    })
})

after(async () => {
  await mongoose.connection.close()
})