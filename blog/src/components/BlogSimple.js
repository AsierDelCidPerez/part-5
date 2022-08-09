
const BlogSimple = ({blogStyle, toggleVisible, blog}) => (
    <div style={blogStyle}>
    <p>{blog.title}</p><button onClick={toggleVisible} className="showButton">Show</button><br/>
    </div>
)

export default BlogSimple