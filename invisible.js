const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')
const todoRoutes = require('./routes/todo')
const morgan = require('morgan')
mongoose.connect(process.env.MONGO, () => {
    console.log('mongoose is connected')
})

app.use(express.json())
app.get('/', (req, res) => {
    res.send('welcome')
})
app.use(morgan('combined'))
app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', todoRoutes)

var Port = process.env.PORT || 3000
app.listen(Port, () => {
    console.log(`${Port}`)
})