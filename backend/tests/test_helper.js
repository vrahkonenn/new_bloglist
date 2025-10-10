const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
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
  },
  {
    "title": "Canonical string reduction",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    "likes": 12,
    "id": "68697d90e758b1900fc0d104"
  },
  {
    "title": "First class tests",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    "likes": 10,
    "id": "68697dc7e758b1900fc0d106"
  },
  {
    "title": "TDD harms architecture",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    "likes": 0,
    "id": "68697e1ae758b1900fc0d108"
  },
  {
    "title": "Type wars",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    "likes": 2,
    "id": "68697e37e758b1900fc0d10a"
  },
  {
    "title": "Keharius",
    "author": "Jorma Teräs",
    "url": "keharit.fi",
    "likes": 192,
    "id": "688228f9b9731e3e4493db17"
  }
]

const users = [
  {
    "username": "suppo",
    "name": "Seppo Taalasmaa",
    "password": "suppo123"
  },
  {
    "username": "izmo",
    "name": "Ismo Laitela",
    "password": "delismo"
  },
  {
    "username": "anonyymi",
    "password": "moi123"
  }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}
module.exports = { initialBlogs, blogsInDb, users, usersInDb }