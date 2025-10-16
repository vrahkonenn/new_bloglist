import IndividualBlog from './IndividualBlog'

const BlogList = ({ blogs, deleteBlog, likeBlog }) => {
  return(
    <div>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <IndividualBlog key={ blog.id } blog={ blog } deleteBlog={ deleteBlog } likeBlog={ likeBlog }/>
        ))
      }
    </div>
  )
}

export default BlogList