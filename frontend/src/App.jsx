import { useState, useEffect, useRef } from 'react'
import './App.css'
import AddBlog from './components/AddBlog'
import BlogList from './components/BlogList'
import Notice from './components/Notice'
import LoggedUser from './components/LoggedUser'
import blogService from './services/blog'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {

  const [blogs, setBlogs] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notice, setNotice] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const addBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const deleteBlog = async (title, id) => {

    if (window.confirm(`Delete ${title} from blogs?`)) {
      try {
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter(b => b.id !== id))
        setNotice(`${title} removed succesfully`)
        setTimeout(() => {
          setNotice(null)
        }, 5000)
      } catch {
        setErrorMessage('Not access to delete this blog')
        console.log('Not access to remove this blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }

    } else {
      console.log(`Remove of: "${title}" cancelled`)
    }
  }

  if (blogs === null) {
    return (
      <div></div>
    )
  }

  const addBlog = async (blogObject) => {
    const createdBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(createdBlog))
    noticeSetter(`New blog "${createdBlog.title}" added succesfully`)
    addBlogRef.current.toggleVisibility()
  }

  const updateBlog = async (blogToUpdate, blogObject) => {
    try {
      const updatedBlog = await blogService.updateBlog(blogToUpdate.id, blogObject)
      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
      noticeSetter(`${blogToUpdate.title} updated succesfully`)
      addBlogRef.current.toggleVisibility()
    } catch {
      setErrorMessage('This user cannot update this blog!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }



  const likeBlog = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.likeBlog(blogToUpdate.id)
      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
    } catch {
      console.log('Like failed')
    }
  }


  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch {
      console.log('Login failed')
      setErrorMessage('Incorrect username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' :'' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return(
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)} className='button'>Log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username} setUsername={setUsername}
            password={password} setPassword={setPassword}
            handleLogin={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)} className='button'>Cancel</button>
        </div>
      </div>
    )
  }

  const errorMessageSetter = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const noticeSetter = (message) => {
    setNotice(message)
    setTimeout(() => {
      setNotice(null)
    }, 5000)
  }

  return (
    <div className='mainDiv'>
      <h1>BLOGS</h1>
      <p><i>Here is a list of blogs and their likes</i></p>
      <Notice notice={notice} errorMessage={errorMessage}/>

      {/*IF USER NOT LOGGED IN ->*/}
      {!user && loginForm()}

      {/*IF USER LOGGED IN ->*/}
      {user &&
      <div>
        <div className='individual'>
          <LoggedUser user={user} logOut={logOut}/>
          <Togglable buttonLabel='Add blog' ref={addBlogRef}>
            <AddBlog
              addBlog={ addBlog }
              updateBlog={ updateBlog }
              blogs ={ blogs }
              errorMessageSetter= { errorMessageSetter }
            />
          </Togglable>
        </div>
        <BlogList blogs={blogs} deleteBlog={deleteBlog} likeBlog={likeBlog}/>
      </div>}

      <i><p>Site made as an exercise of a fullstack course<br />made by Veeti</p></i>
    </div>
  )
}

export default App