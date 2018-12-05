let mongoose = require('mongoose')

let programListSchema = new mongoose.Schema({
    link: String,
    name: String
})

module.exports = mongoose.model('Programs', programListSchema, 'programs')