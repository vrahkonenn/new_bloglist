const assert = require('node:assert')
const { test, after, beforeEach, describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
})

describe('Adding users', () => {



    test('Adding a fresh username succeeds', async () => {
        
        const newUser = {
            "username": "tappi",
            "password": "salasana"
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, 2)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })
})

describe('Fails with proper statuscode and message if', () => {

    test('username already taken', async () => {
    const newUser = {
        "username": 'root',
        "name": 'seppo',
        "password": 'salainen'
    }
    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(401)
    .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes(`Username already exists!`))
    assert.strictEqual(usersAtEnd.length, 1)
    })

    test('username is too short', async () => {
        const newUser = {
            "username": 'ro',
            "name": 'seppo',
            "password": 'salainen'
        }
        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(401)
        .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('Username and password must contain at least 3 letters'))
        assert.strictEqual(usersAtEnd.length, 1)
    })

    test('password is too short', async () => {
        const newUser = {
            "username": 'huhhuh',
            "name": 'seppo',
            "password": 'sa'
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(401)
        .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('Username and password must contain at least 3 letters'))
        assert.strictEqual(usersAtEnd.length, 1)
    })

    test('username does not exist', async () => {
        const newUser = {
        "name": 'seppo',
        "password": 'salainen'
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(401)
        .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('New user must have username and password'))
        assert.strictEqual(usersAtEnd.length, 1)
    })

    test('password does not exist', async () => {
        const newUser = {
        "username": "kuppi",
        "name": "seppo"
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(401)
        .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('New user must have username and password'))
        assert.strictEqual(usersAtEnd.length, 1)
    })

})
after(async () => {
    await mongoose.connection.close()
})