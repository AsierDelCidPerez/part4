const mongoose = require('mongoose')
const unique = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    name: {
        minLength: 3,
        type: String
    },
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    'transform' : (_, reqObj) => {
        reqObj.id = reqObj._id.toString()
        delete reqObj.passwordHash
        delete reqObj._id
        delete reqObj.__v
    }
})

mongoose.plugin(unique)

module.exports = mongoose.model('User', userSchema)