const AddBlog = ({ addBlog, title, setTitle, author, setAuthor, url, setUrl, likes, setLikes }) => {
  return(
    <div className="individual">
      <h2>Add a new blog</h2>
      <hr className="hrStyle"></hr>
      <form onSubmit={addBlog}>
        <div className="input">
          <label htmlFor="title">Title</label>
          <input id="title" type="text" value={ title } onChange={({ target }) => setTitle(target.value)}></input>
        </div>
        <div className="input">
          <label htmlFor="author">Author</label>
          <input id="author" type="text" value={ author } onChange={({ target }) => setAuthor(target.value)}></input>
        </div>
        <div className="input">
          <label htmlFor="url">URL</label>
          <input id="url" type="text" value={ url } onChange={({ target }) => setUrl(target.value)}></input>
        </div>
        <div className="input">
          <label htmlFor="likes">Likes</label>
          <input id="likes" type="text" value={ likes } onChange={({ target }) => setLikes(target.value)}></input>
        </div>
        <button className="button" type="submit">Add</button> 
        </form>
    </div>
  )
}

export default AddBlog