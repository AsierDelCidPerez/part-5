import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

// Blog = {title, author, url, likes}

const setToken = newToken => token = `bearer ${newToken}`


const agregarBlog = async blog => {
    const config = {
        headers: {Authorization: token}
    }
    const res = await axios.post(baseUrl, blog, config)
    return res.data
}

const getAll = async() => {
    const config = {
        headers: {Authorization: token}
    }
    const res = await axios.get(baseUrl, config)
    return res.data
}

const getById = id => axios.get(`${baseUrl}/${id}`).then(res => res.data)

const deleteBlog = async id => {
    const config = {
        headers: {Authorization: token}
    }
    const res = await axios.delete(`${baseUrl}/${id}`, config)
    return res.data
}

const editaBlog = async(blog, id) => await axios.put(`${baseUrl}/${id}`, blog)

const blogService = {agregarBlog, getAll, getById, deleteBlog, editaBlog, setToken}

export default blogService
