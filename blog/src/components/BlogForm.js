import Titulo from "./Titulo"
import Notification from "./Notification"
import Filtro from "./Filtro"
import Registro from "./Registro"
import Agregar from "./Agregar"
import blogService from "../services/blog"

import {React, useState, useEffect} from 'react'

const BlogForm = ({setNotification}) => {
    const [blogs, setBlogs] = useState([])
  
    useEffect(() => {
      blogService.getAll().then(res => setBlogs(res))
    }, [])

    return (
        <div>
        <Titulo text="Banco de blogs"/>
        <Filtro blogs={blogs} setBlogs={setBlogs}/>
        <Registro blogs={blogs} setBlogs={setBlogs} notifications={setNotification}/>
        <Agregar blogs={blogs} setBlogs={setBlogs} notifications={setNotification}/>
      </div>
    )
}

export default BlogForm