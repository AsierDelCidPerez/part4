import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => axios.get(baseUrl).then(res => res.data)

const addNew = newObj => axios.post(baseUrl, newObj).then(res => res.data)

const update = (id, newObj) => axios.put(`${baseUrl}/${id}`, newObj).then(res => res.status === 200 ? res.data : null).catch(err => null)

const deletePhone = id => axios.delete(`${baseUrl}/${id}`).then(res => res.status === 200 ? res.data : null).catch(err => null)

export default {getAll, update, deletePhone, addNew}