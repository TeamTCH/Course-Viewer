let mongoose = require('mongoose')

let StaffMember = new mongoose.Schema({
    _id: Number,
    name: String,
    phone: Number,
    email: String,
    appointments: [
        {
            date: Date,
            startTime: Date,
            endTime: Date,
            studentID: Number,
            studentName: String,
            studentEmail: String,
            confirmed: Boolean
        }
    ]
})

module.exports = mongoose.model('StaffMember', StaffMember)