let mongoose = require('mongoose')

let StaffMember = new mongoose.Schema({
    staffID: Number,
    name: String,
    phone: String,
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

module.exports = mongoose.model('StaffMember', StaffMember, "staff")