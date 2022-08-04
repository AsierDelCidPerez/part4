const loginRouter = require('express').Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async(req, res) => {
    const body = req.body
    const user = await User.findOne({username: body.username})
    if(bcrypt.compare(body.password, user.passwordHash)){
        const myUser = {
            username: user.username,
            name: user.name,
            id: user.id
        }
        const token = jwt.sign(myUser, process.env.SECRET)
        res.json({token, username: user.username, name: user.name})
    }else res.status(401).json({error: 'Username or password not valid'})
})

module.exports = loginRouter