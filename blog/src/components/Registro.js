import Blog from './Blog'

const Registro = ({blogs, setBlogs, notifications}) => {
    return (
        <ul>
        { 
            blogs.map(element => <li key={element.id}><Blog blog={element} blogs={blogs} setBlogs={setBlogs} notifications={notifications}/></li>) 
        }
        </ul>
    )
}
export default Registro