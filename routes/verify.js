const jwt= require('jsonwebtoken')

const router = require('express').Router()


const verify = (req, res, next) => {
    const authHeaders = req.headers.token
    if (authHeaders) {
        const token = authHeaders.split(" ")[1]
        jwt.verify(token, process.env.TOKEN, (err, verified) => {
            if (err) return res.status(400).send('token is not correct')
            req.user = verified
            next()
        })
    } else {
        return res.status(400).send('you dont have acess')
    }
}

const verified = (req, res, next) => {
    verify(req, res, () => {
        if (req.user.id = req.params.id) {
            next()
        } else {
            res.status(400).send('you only have acess to your acoount')
        }
    })
}


module.exports= verified