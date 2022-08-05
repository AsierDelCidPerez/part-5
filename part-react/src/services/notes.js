import axios from 'axios'
const baseUrl = '/api/notes'

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const nonExisting = {
        id: 1000,
        content: 'This note is not saved to server',
        date: '2022-06-16',
        important: true
    }
    return axios.get(baseUrl).then(response => response.data.concat(nonExisting))
}
const create = async newObject => {
    const config = {
        headers: {
            "Authorization": token
        }
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}
const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)


export default {getAll, create, update, setToken}