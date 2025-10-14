import IndividualBlog from "./IndividualBlog"

const BlogList = ({ blogs, deleteBlog}) => {
  return(
    <div>
      {blogs.map(blog => (
        <IndividualBlog key={blog.id} blog={blog} deleteBlog={deleteBlog}/>
      ))}
    </div>
  )
}

export default BlogList