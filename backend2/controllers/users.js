const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../model/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const auth = request.get('authorization')
    if(auth && auth.toLowerCase().startsWith('bearer')){
        return auth.substring(7)
    }
    return null
}

userRouter.post('/', async(req, res, next) => {
    const body = req.body

    if(!body || !body.username || !body.name || !body.password){
        return res.status(400).json({error: "You must fill: username, name and password"})
    }

    if(body.password.length < 3) return res.status(400).json({error: 'The password must have length up or equal to 3.'})
    
    const passwordHash = await bcrypt.hash(body.password, 10)
    const newUser = new User({
        username: body.username,
        passwordHash,
        name: body.name
    })
    res.json(await newUser.save())

})

userRouter.get('/', async(req, res) => res.json(await User.find({}).populate('blogs', {id: 1,title: 1, author: 1, url: 1, likes: 1})))

module.exports = userRouter