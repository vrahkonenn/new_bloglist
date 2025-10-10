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


const blogToAdd = {
    "title": "Vammailun perusteet",
    "author": "Heppu",
    "url": "https://heppu.com/",
}

if (!blogToAdd.likes) {
    blogToAdd.likes = 0
}

describe('Adding blogs to db', async () => {

    test('Blog is added to db', async () => {

        await api
            .post('/api/blogs')
            .send(blogToAdd)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length +1)

        const contents = blogsAtEnd.map(b => b.title)
        assert(contents.includes('Vammailun perusteet'))
    })

    test('When adding a blog without "likes" property, likes is set to 0', async () => {
        await api
            .post('/api/blogs')
            .send(blogToAdd)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        let blogToAssert = ""
        blogsAtEnd.forEach(blog => {
            if (blog.title === blogToAdd.title) {
                blogToAssert = blog
            }
        })
        
        assert.strictEqual(blogToAssert.likes, 0)
    })

    test('When adding a blog without title or url, post is failed and returns error code 400', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const newblog = {
            "title": "Kahvin voima",
            "author": "Urho",
            "likes": 11
        }

        await api
            .post('/api/blogs')
            .send(newblog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
    })
})

after(async () => {
  await mongoose.connection.close()
})