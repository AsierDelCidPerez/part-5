const BlogCompleto = ({blogStyle, toggleVisible, blog, addLike, remove}) => {
    const flexStyle = {display: "flex"}
    
    return(
    <div style={blogStyle}>
        <p>{blog.title}</p><button onClick={toggleVisible} className="hideButton">Hide</button>
        <p>Autor: {blog.author}</p>
        <div style={flexStyle}><p>Likes: {blog.likes}</p><button onClick={addLike} id="likesButtonViewBlog">Like</button></div>
        <a href={blog.url} rel="noreferrer" target="_blank">{blog.url}</a>
        <button onClick={remove}>Remove</button>
    </div>
)}

export default BlogCompleto