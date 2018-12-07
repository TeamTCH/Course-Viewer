let mongoose = require('mongoose')

let StaffMember = new mongoose.Schema({
    staffID: Number,
    name: String,
    phone: String,
    email: String,
    appointments: [
        {
            appointmentID: String,
            date: String,
            startTime: String,
            studentID: Number,
            studentName: String,
            studentEmail: String,
            message: String,
            confirmed: Boolean
        }
    ]
})

module.exports = mongoose.model('StaffMember', StaffMember, "staff")