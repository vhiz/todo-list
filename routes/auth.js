const User = require('../models/User')

const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/new', async (req, res) => {
    const userexist = await User.findOne({ username: req.body.username })
    if (userexist) return res.status(400).send('user already exist')
    
    const emailexist = await User.findOne({ email: req.body.email })
    if(emailexist) return res.status(400).send('users already exist')

    const salt = await bcrypt.genSalt(11)
    const password = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: password
    })
    try {
        const saved =await newUser.save()
        res.status(200).send(saved)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(400).send('user notfound')

    const valid = await bcrypt.compare(req.body.password, user.password)
    if (!valid) return res.status(400).send('error not corect')
    
    const { password, ...others } = user._doc
    const token = jwt.sign({_id:user.id}, process.env.TOKEN,{expiresIn:'24h'})
    res.status(200).send({...others, token})
})


module.exports= router