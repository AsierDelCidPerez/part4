import blogService from "../services/blog"

const Filtro = ({blogs, setBlogs}) => {

    const escritura = event => {
        const texto = event.target.value
        blogService.getAll().then(res => setBlogs(res.filter(blog => blog.title.match(texto))))
    }

    return (
        <input type="text" onChange={escritura} placeholder="Filtro por título"/>
    )
}

export default Filtro