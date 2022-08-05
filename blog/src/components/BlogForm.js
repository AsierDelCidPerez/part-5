import Titulo from "./Titulo"
import Notification from "./Notification"
import Filtro from "./Filtro"
import Registro from "./Registro"
import Agregar from "./Agregar"
import blogService from "../services/blog"

import {React, useState, useEffect} from 'react'

const BlogForm = () => {

    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState({
      text: null, isSuccess: true
    })
  
    useEffect(() => {
      blogService.getAll().then(res => setBlogs(res))
    }, [])

    return (
        <div>
        <Titulo text="Banco de blogs"/>
        <Notification text={notification.text} isSuccess={notification.isSuccess}/>
        <Filtro blogs={blogs} setBlogs={setBlogs}/>
        <Registro blogs={blogs} setBlogs={setBlogs} notifications={setNotification}/>
        <Agregar blogs={blogs} setBlogs={setBlogs} notifications={setNotification}/>
      </div>
    )
}

export default BlogForm