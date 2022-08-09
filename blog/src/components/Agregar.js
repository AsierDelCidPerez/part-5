import React, {useState} from 'react'
import blogService from '../services/blog'
const Agregar = ({blogs, setBlogs, notifications, testing=undefined}) => {
    const [fields, setFields] = useState({
        title: "",
        author: "",
        url: "",
        likes: 0
    })

    const generarNotification = (text, isSuccess) => {
        notifications({text, isSuccess})
        setTimeout(() => notifications({text: null, isSuccess: false}), 5000)
    }

    const getMyEscritura = tipo => event => {
        const nuevoObj = {...fields}
        nuevoObj[tipo] = event.target.value
        // console.log(nuevoObj)
        setFields(nuevoObj)
    }

    const validar = () => {
        for(let clave in fields){
            if(fields[clave].length === 0) {
                generarNotification(`El campo '${clave}' no puede estar vacío`, false)
                return false
            }
        }
        return true
    }

    const existe = title => {
        console.log(title.trim().toLowerCase())
        let resultado = -1
        blogs.forEach(blog => {
            if(blog.title.trim().toLowerCase() === title.trim().toLowerCase()) resultado = blog.id
        })
        return resultado
    }

    const agregarBlog = async event => {
        if(testing !== undefined) testing(fields)
        event.preventDefault()
        if(validar()){
            const existencia = existe(fields.title)
            if(existencia !== -1){
                if(window.confirm(`The blog '${fields.title}' already exists, so do you like to update it?`)){
                    blogService.editaBlog(fields, existencia).then(updatedBlog => {
                        generarNotification(`The blog '${updatedBlog.title}' was successfully updated`, true)
                        setBlogs(blogs.filter(blog => blog.id !== updatedBlog.id).concat(updatedBlog))
                }).catch(err => generarNotification(`Error: ${err.message}`, false))
                }
            }else{
                try{
                    const newBlog = await blogService.agregarBlog(fields)
                    console.log(newBlog)
                    generarNotification(`El blog ha sido agregado exitósamente`, true)
                    setBlogs(blogs.concat(newBlog))
                }catch(exception){
                    generarNotification(`Error: ${exception.message}`, false)
                }
            }
        }
    }

    return (
        <form onSubmit={agregarBlog}>
            <input type="text" placeholder="Título" id="blogTitleAddBlogForm" value={fields.title} onChange={getMyEscritura('title')}/>
            <input type="text" placeholder="Autor" id="blogAuthorAddBlogForm" value={fields.author} onChange={getMyEscritura('author')}/>
            <input type="text" placeholder="URL" id="blogUrlAddBlogForm" value={fields.url} onChange={getMyEscritura('url')}/>
            <input type="number" min={0} placeholder="Likes" id="blogLikesAddBlogForm" value={fields.likes} onChange={getMyEscritura('likes')}/>
            <button type="submit" id="agregarBlog">Agregar</button>
        </form>
    )
}

export default Agregar