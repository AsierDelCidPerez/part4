const Blog = require("../model/blog")

const initialBlogs = [
    {
        title: "Organización y arquitectura de computadores",
        author:"William Stallings",
        url:"https://www.amazon.es/dp/8489660824/",
        likes: 325
    },
    {
        title: "Historia de la informática",
        author:"Manuel Llaca",
        url: "https://www.amazon.es/dp/8419197335/",
        likes: 89
    },
    {
        title: "Superpotencias de la IA",
        author:"Kai-Fu Lee",
        url: "https://www.amazon.es/dp/8423431312/",
        likes: 279
    }
]


const newUser = {
    username: "root",
    password: "root",
    name: "Global Administrator"
}

module.exports = {
    initialBlogs, newUser
}