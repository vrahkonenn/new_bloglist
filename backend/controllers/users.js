const usersRouter = require('express').Router()
const { request } = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    // Must have username and password
    if (!username || !password) {
        return response.status(401).json({
            error: 'New user must have username and password'
        })
    }

    // Username and password must contain at least 3 letters
    if (username.length < 3 || password.length < 3) {
        return response.status(401).json({
            error: 'Username and password must contain at least 3 letters'
            
        })
    }

    // Username must be unique
    const userInDb = await User.findOne({ username })
    if (userInDb) {
        return response.status(401).json({
            error: `Username already exists!`
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User ({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {url:1, title: 1, author:1})
    response.json(users)
})

module.exports = usersRouter
