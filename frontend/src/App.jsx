import { useState, useEffect } from "react"
import axios from "axios"
import './App.css'

const AddBlog = ({addBlog}) => {
  return(
    <div className="individual">
      <h2>Add a new blog</h2>
      <hr className="hrStyle"></hr>
      <div className="input">
        <label htmlFor="title">Title</label>
        <input id="title" type="text"></input>
      </div>
      <div className="input">
        <label htmlFor="author">Author</label>
        <input id="author" type="text"></input>
      </div>
      <div className="input">
        <label htmlFor="url">URL</label>
        <input id="url" type="text"></input>
      </div>
      <div className="input">
        <label htmlFor="likes">Likes</label>
        <input id="likes" type="text"></input>
      </div>
      <button className="button" onClick={addBlog}>Add</button> 
    </div>
  )
}

const IndividualBlog = ({blog, deleteBlog}) => {
  return(
    <div className="individual">
      <h2>{blog.title}</h2>
      <hr className="hrStyle"/>
      <p><b>Author:</b> {blog.author}</p>
      <p><b>url:</b> <a href={blog.url}>{blog.url}</a></p>
      <p><b>Likes:</b> {blog.likes}</p>
      <button className="button" onClick={() => deleteBlog(blog.title, blog.id)}>Delete</button>
    </div>
  )
}

const BlogList = ({ blogs, deleteBlog}) => {
  return(
    <div>
      {blogs.map(blog => (
        <IndividualBlog key={blog.id} blog={blog} deleteBlog={deleteBlog}/>
      ))}
    </div>
  )
}

const App = () => {

  const [blogs, setBlogs] = useState(null)

  useEffect(() => {
    axios
      .get("http://localhost:3003/api/blogs")
      .then(response => {
      setBlogs(response.data)
    })
  }, [])
  
  const buttonClick = () => {
    console.log('blogs', blogs)
  }

  const deleteBlog = async (title, id) => {

    if (window.confirm(`Delete ${title} from blogs?`)) {

      await axios.delete(`http://localhost:3003/api/blogs/${id}`)
      setBlogs(blogs.filter(b => b.id !== id))
      console.log(`${title} removed succesfully`)

    } else {
      console.log(`Remove of: "${title}" cancelled`)
    }
  }

  if (blogs === null) {
    return (
      <div></div>
    )
  }

  const addBlog = async () => {
    const blogTitle = document.getElementById("title").value
    const blogAuthor = document.getElementById("author").value
    const blogUrl = document.getElementById("url").value
    const blogLikes = document.getElementById("likes").value

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: blogLikes
    }

    if (blogObject.likes === "") {
      blogObject.likes = 0
    }

    if (!blogObject.title || !blogObject.url) {
          console.log('Post failed, new blog must contain title and url')
          document.getElementById("title").value = ""
          document.getElementById("author").value = ""
          document.getElementById("url").value = ""
          document.getElementById("likes").value = ""
    } else {

      const blogTitles = blogs.map(b => b.title)

      if (blogTitles.includes(blogTitle)) {
        if (window.confirm(`${blogTitle} is already in bloglist. Do you want to update it?`)) {

            const blogToUpdate = blogs.find(blog => blog.title === blogTitle)
            console.log('Blog to update: ', blogToUpdate)
            
            const response = await axios.put(`http://localhost:3003/api/blogs/${blogToUpdate.id}`, blogObject)
            const updatedBlog = response.data
            setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
            console.log(`${blogTitle} updated succesfully`)
            
            document.getElementById("title").value = ""
            document.getElementById("author").value = ""
            document.getElementById("url").value = ""
            document.getElementById("likes").value = ""
          
        } else {
          console.log("Adding a new blog cancelled")
        }

      } else { 
        const response = await axios.post("http://localhost:3003/api/blogs", blogObject)
        const createdBlog = response.data
        setBlogs(blogs.concat(createdBlog))
        console.log(`${createdBlog.title} created succesfully`)
        
        document.getElementById("title").value = ""
        document.getElementById("author").value = ""
        document.getElementById("url").value = ""
        document.getElementById("likes").value = ""
      }
    }
  }

  return (
    <div className="mainDiv">
    <h1>BLOGS</h1>
    <p><i>Here is a list of blogs and their likes</i></p>
    <AddBlog addBlog={addBlog} />
    <BlogList blogs={blogs} deleteBlog={deleteBlog}/>
    <i><p>Site made as an exercise of a fullstack course<br />made by Veeti</p></i>
  </div>
  )
}

export default App