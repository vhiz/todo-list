const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    list: { type: String}
})

module.exports = mongoose.model('List', listSchema)