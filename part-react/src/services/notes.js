import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
    const nonExisting = {
        id: 1000,
        content: 'This note is not saved to server',
        date: '2022-06-16',
        important: true
    }
    return axios.get(baseUrl).then(response => response.data.concat(nonExisting))
}
const create = (newObject, notification) => axios.post(baseUrl, newObject).then(response => response.data).catch(err => {
    notification({})
})
const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)

const exported = {getAll, create, update}

export default exported