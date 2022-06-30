import blogService from "../services/blog"

const Blog = ({blog, blogs, setBlogs, notifications}) => {

    const eliminarBlog = event => {
        if(window.confirm(`Sure, you want to delete: '${blog.title}'?`)){
            blogService.deleteBlog(blog.id)
            .then(() => setBlogs(blogs.filter(myBlog => myBlog.id !== blog.id)))
            .catch(err => {
                notifications({
                    text: `Error: ${err.message}`,
                    isSuccess: false
                })
                setTimeout(() => notifications({text: null, isSuccess: false}), 5000)
            })
        }
    }

    return (
        <>
            <a href={blog.url} rel="noreferrer" className="link" target="_blank">{blog.title} ({blog.author}) - {blog.likes} likes</a>&nbsp;
            <button onClick={eliminarBlog}>Delete</button>
        </>
    )
}

export default Blog