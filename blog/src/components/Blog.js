import blogService from "../services/blog"
import React, {useState} from 'react'
import BlogCompleto from "./BlogCompleto"
import BlogSimple from "./BlogSimple"

const Blog = ({blog, blogs, setBlogs, notifications, addLikes=undefined}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
    const [isComplet, setIsComplet] = useState(false)

    const toggleVisible = () => setIsComplet(!isComplet)

    const like = async event => {
        parseInt()
        await blogService.editaBlog({
            ...blog, likes: "" + (parseInt(blog.likes)+1)
        }, blog.id)
        setBlogs(blogs.filter(myBlog => myBlog.id !== blog.id).concat({...blog, likes: (parseInt(blog.likes)+1) + ""}))
    }

    if(!addLikes) addLikes = like

    const eliminarBlog = event => {
        if(window.confirm(`Sure, you want to delete: '${blog.title}'?`)){
            blogService.deleteBlog(blog.id)
            .then(() => setBlogs(blogs.filter(myBlog => myBlog.id !== blog.id)))
            .catch(err => {
                notifications({
                    text: `Error: ${err.message}`,
                    isSuccess: false
                })
                setTimeout(() => notifications({text: null, isSuccess: false}), 5000)
            })
        }
    }

    const hideWithComplet = {display: isComplet ? 'none' : ''}
    const showWithComplet = {display: !isComplet ? 'none' : ''}

    return (
        <>
            <div style={hideWithComplet} className="blogSimplxum">
                <BlogCompleto blogStyle={blogStyle} toggleVisible={toggleVisible} blog={blog} addLike={addLikes} remove={eliminarBlog}/>
            </div>
            <div style={showWithComplet} className="blogCompletxum">
                <BlogSimple blogStyle={blogStyle} toggleVisible={toggleVisible} blog={blog}/>
            </div>
        </>
    )
}

export default Blog