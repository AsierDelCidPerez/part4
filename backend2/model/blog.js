const config = require('../utils/config')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        unique: true,
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    url: {
        required: true,
        minlength: 4,
        type: String
    },
    likes: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (doc, reqObj) => {
        reqObj.id = reqObj._id.toString()
        delete reqObj._id
        delete reqObj.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
