const _ = require('lodash')

const dummy = array => 1
const totalLikes = array => {
    if(array.length === 0) return 0
    const likes = array.map(blog => blog.likes)
    return likes.reduce((sum, curr) => sum+curr)
}

const favoriteBlog = array => { 
    let favorito = {likes: -1}
    array.map(blog => {
        if(blog.likes > favorito.likes) favorito = blog
    })
    return favorito
}

const mostBlogs = array => {
    const autores = _.countBy(array, 'author')
    let mayorAutor = undefined;
    for(let prop in autores){
        if(!mayorAutor) {
            const obj = {}
            obj.author = prop
            obj.blogs = autores[prop]
            mayorAutor = obj
        }else{
            if(autores[Object.keys(autores)[0]] < autores[prop]){
                const obj = {}
                obj.author = prop
                obj.blogs = autores[prop]
                mayorAutor = obj
            }
        }
    }
    return mayorAutor
}

const mostLikes = array => {
    const autores = Object.keys(_.countBy(array, 'author'))
    const obj = {}
    autores.map(autor => {
        obj[autor] = array.filter(blog => blog.author === autor)
    })
    for(let campo in obj){
        obj[campo] = obj[campo].map(blogs => blogs.likes).reduce((sum, curr) => sum+curr)
    }
    let maxLikedAuthor = undefined
    for(let campo in obj){
        if(!maxLikedAuthor) {
            maxLikedAuthor = {
                author: campo,
                likes: obj[campo]
            }
        }else{
            if(maxLikedAuthor.likes < obj[campo]){
                maxLikedAuthor = {
                    author: campo,
                    likes: obj[campo]
                }
            }
        }
    }
    return maxLikedAuthor
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}