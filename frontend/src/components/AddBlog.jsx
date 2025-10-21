import { useState } from 'react'

const AddBlog = ({ addBlog, updateBlog, blogs, errorMessageSetter }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')


  const resetFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  const sendBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes
    }

    if (blogObject.likes === '') {
      blogObject.likes = 0
    }

    if (!blogObject.title || !blogObject.url) {
      errorMessageSetter('Post failed! New blog must contain title and url!')
    } else {

      const blogTitles = blogs.map(b => b.title)

      if (blogTitles.includes(title)) {
        if (window.confirm(`${title} is already in bloglist. Do you want to update it?`)) {
          const blogToUpdate = blogs.find(blog => blog.title === title)
          resetFields()
          updateBlog(blogToUpdate, blogObject)
        }
      } else {
        resetFields()
        addBlog(blogObject)
      }
    }
  }

  return(
    <div>
      <h2>Add a new blog</h2>
      <hr className='hrStyle'></hr>
      <form onSubmit={sendBlog}>
        <div className='input'>
          <label htmlFor='title'>Title</label>
          <input 
            id='title'
            type='text'
            value={ title }
            onChange={({ target }) => setTitle(target.value)}
            placeholder='title'>
          </input>
        </div>
        <div className='input'>
          <label htmlFor='author'>Author</label>
          <input 
            id='author'
            type='text'
            value={ author }
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='author'>
          </input>
        </div>
        <div className='input'>
          <label htmlFor='url'>URL</label>
          <input
            id='url'
            type='text'
            value={ url }
            onChange={({ target }) => setUrl(target.value)}
            placeholder='url'>
          </input>
        </div>
        <div className='input'>
          <label htmlFor='likes'>Likes</label>
          <input id='likes'
            type='text'
            value={ likes }
            onChange={({ target }) => setLikes(target.value)}
            placeholder='likes'>
          </input>
        </div>
        <button className='button' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default AddBlog