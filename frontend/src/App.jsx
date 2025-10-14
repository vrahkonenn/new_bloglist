import { useState, useEffect } from "react"
import './App.css'
import AddBlog from "./components/AddBlog"
import BlogList from "./components/BlogList"
import Notice from "./components/Notice"
import LoggedUser from "./components/LoggedUser"
import blogService from "./services/blog"
import loginService from "./services/login"
import LoginForm from "./components/LoginForm"

const App = () => {

  const [blogs, setBlogs] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notice, setNotice] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  
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

  const resetFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes
    }

    if (blogObject.likes === "") {
      blogObject.likes = 0
    }

    if (!blogObject.title || !blogObject.url) {
          console.log('Post failed! New blog must contain title and url!')
          setErrorMessage('Post failed! New blog must contain title and url!')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          resetFields()

    } else {

      const blogTitles = blogs.map(b => b.title)

      if (blogTitles.includes(title)) {
        if (window.confirm(`${title} is already in bloglist. Do you want to update it?`)) {

            const blogToUpdate = blogs.find(blog => blog.title === title)
            console.log('Blog to update: ', blogToUpdate)
            try {

              const updatedBlog = await blogService.updateBlog(blogToUpdate.id, blogObject)
              setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
              console.log(`${title} updated succesfully`)
              setNotice(`${title} updated succesfully`)
              setTimeout(() => {
                setNotice(null)
              }, 5000)
              
              resetFields()

            } catch {
              setErrorMessage('This user cannot update this blog!')
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            }
          
        } else {
          console.log("Adding a new blog cancelled")
        }

      } else { 
        const createdBlog = await blogService.create(blogObject)
        setBlogs(blogs.concat(createdBlog))
        console.log(`${createdBlog.title} created succesfully`)
        setNotice(`New blog "${createdBlog.title}" added succesfully`)
        setTimeout(() => {
          setNotice(null)
        }, 5000)

       resetFields()
      }
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
          <button onClick={() => setLoginVisible(true)} className="button">Log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm 
            username={username} setUsername={setUsername} 
            password={password} setPassword={setPassword} 
            handleLogin={handleLogin}  
          />
          <button onClick={() => setLoginVisible(false)} className="button">Cancel</button>
        </div>
      </div>
    )
  }

  const loggedView = () => (
    <div>
      <LoggedUser user={user} logOut={logOut}/>
      <AddBlog 
        addBlog={ addBlog } 
        title={ title } setTitle={ setTitle } 
        author={ author } setAuthor={ setAuthor } 
        url={ url } setUrl={ setUrl } 
        likes={ likes } setLikes={ setLikes }
      />
      <BlogList blogs={blogs} deleteBlog={deleteBlog}/>
    </div>
  )

  return (
    <div className="mainDiv">
      <h1>BLOGS</h1>
      <p><i>Here is a list of blogs and their likes</i></p>
      <Notice notice={notice} errorMessage={errorMessage}/>
      {!user && loginForm()}
      {user && loggedView()}
      <i><p>Site made as an exercise of a fullstack course<br />made by Veeti</p></i>
    </div>
  )
}

export default App