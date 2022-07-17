const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    list:{type:[String]}
})

module.exports = mongoose.model('Todo', todoSchema)