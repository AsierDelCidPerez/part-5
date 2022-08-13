import Blog from './Blog'

const Registro = ({blogs, setBlogs, notifications}) => {
    blogs.sort((a, b) => b.likes - a.likes)
    return (
        <div>
            { 
                blogs.map(element => <Blog key={element.id} blog={element} blogs={blogs} setBlogs={setBlogs} notifications={notifications}/>) 
            }
        </div>
    )
}
export default Registro