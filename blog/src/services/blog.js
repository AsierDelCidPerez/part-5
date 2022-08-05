import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

// Blog = {title, author, url, likes}

const setToken = newToken => token = `bearer ${newToken}`


const agregarBlog = async blog => {
    const config = {
        headers: {Authorization: token}
    }
    const res = axios.post(baseUrl, blog, config)
    return res.data
}

const getAll = () => axios.get(baseUrl).then(res => res.data)

const getById = id => axios.get(`${baseUrl}/${id}`).then(res => res.data)

const deleteBlog = id => axios.delete(`${baseUrl}/${id}`).then(res => res.data)

const editaBlog = (blog, id) => axios.put(`${baseUrl}/${id}`, blog).then(res => res.data)

const blogService = {agregarBlog, getAll, getById, deleteBlog, editaBlog, setToken}

export default blogService
