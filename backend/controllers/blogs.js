const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const { request } = require('express')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name:1})
  response.json(blogs)
})


blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {

    const body = request.body
    const user = request.user

    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid'})
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
    response.status(201).json(populatedBlog)
    console.log('Post succesful')

})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const user = await request.user

  if (!user) {
    return response.status(400).json({error: "userID invalid or missing"})
  }
  
  const blogToDelete = await Blog.findById(request.params.id)
  
  if (blogToDelete.user.toString() !== user._id.toString()) {
      return response.status(400).json({ error: "This user can't remove this blog"})
  } else {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {

  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid'})
  }

  if (!request.body.title || !request.body.url) {
    console.log('Post failed, new blog must contain title and url')
    response.status(400).end()
  }

  try {
    const { title, author, url, likes } = request.body

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).end()
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(400).json({ error: "This user can't update this blog"})
    } else {
        
      blog.title = title
      blog.author = author
      blog.url = url
      blog.likes = likes || 0
      
      const updatedBlog = await blog.save()
      response.json(updatedBlog)
    }

  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'something went wrong' })
  }
})

blogsRouter.put('/like/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) return response.status(404).end()

    blog.likes = (request.body.likes !== undefined)
      ? request.body.likes
      : blog.likes + 1

    const updatedBlog = await blog.save()
    const populatedBlog = await updatedBlog.populate('user', { username: 1, name: 1 })

    response.json(populatedBlog)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'something went wrong' })
  }
})

module.exports = blogsRouter