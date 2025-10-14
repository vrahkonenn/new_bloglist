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

export default IndividualBlog