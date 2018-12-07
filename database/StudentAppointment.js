let mongoose = require('mongoose')

let StudentAppointment = new mongoose.Schema({
    _id: Number,
    name: String,
    email: String,
    appointments:[
        {
            appointmentID: String,
            date:String,
            startTime:String,
            staffID:Number,
            staffName:String,
            message: String,
            confirmed:Boolean
        }
    ]
})
module.exports = mongoose.model('StudentAppointment',StudentAppointment,'studentAppointment')