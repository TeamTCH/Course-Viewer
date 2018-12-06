let mongoose = require('mongoose')
let Course = new mongoose.Schema({
    name: String,
    code: String,
    lecture: String,
    instructor: String,
    times: [
        {
            date: String,
            building: String,
            location: String
        }
    ]
})

module.exports = mongoose.model('Course',Course,'classes')