import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/blog'

// Blog = {title, author, url, likes}

const agregarBlog = blog => axios.post(baseUrl, blog).then(res => res.data)

const getAll = () => axios.get(baseUrl).then(res => res.data)

const getById = id => axios.get(`${baseUrl}/${id}`).then(res => res.data)

const deleteBlog = id => axios.delete(`${baseUrl}/${id}`).then(res => res.data)

const editaBlog = (blog, id) => axios.put(`${baseUrl}/${id}`, blog).then(res => res.data)

const blogService = {agregarBlog, getAll, getById, deleteBlog, editaBlog}

export default blogService
