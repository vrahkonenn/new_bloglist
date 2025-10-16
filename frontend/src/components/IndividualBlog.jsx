import { useState } from 'react'

const IndividualBlog = ({ blog, deleteBlog, likeBlog }) => {
  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const likeClick = () => {
    likeBlog(blog)
  }


  if (showAll) {
    return(
      <div className='individual'>
        <h2>{blog.title}</h2>
        <hr className='hrStyle'/>
        <p><b>Author:</b> {blog.author}</p>
        <p><b>url:</b> <a href={blog.url}>{blog.url}</a></p>
        <p><b>Likes:</b> {blog.likes}</p>
        <button onClick={likeClick}>Like</button>
        <p><b>Added by:</b> {blog.user.username}</p>
        <button className='button' onClick={toggleShowAll}>hide</button>
        <button className='button' onClick={() => deleteBlog(blog.title, blog.id)}>Delete</button>
      </div>
    )

  } else {
    return(
      <div className='individual'>
        <h2>{blog.title}</h2>
        <hr className='hrStyle'/>
        <p><b>Author:</b> {blog.author}</p>
        <button className='button' onClick={toggleShowAll}>show</button>
      </div>
    )
  }
}

export default IndividualBlog