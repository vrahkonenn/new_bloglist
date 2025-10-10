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

describe('Getting blogs from db', () => {

    test('all blogs are returned', async () => {
        const response = await api
        .get('/api/blogs')
        .expect(200)
        
        assert.strictEqual(response.body.length, helper.initialBlogs.length) // +1 add_blog.test.js adds blog to db and this test runs after it
    })

    
    test('blogs have "id" field, not "_id"', async () => {
        const response = await api
        .get('/api/blogs')
        .expect(200)
      
        response.body.forEach(blog => {
            assert(blog.id);
        })
    })
})

after(async () => {
  await mongoose.connection.close()
})