let mongoose = require('mongoose')

let StudentAppointment = new mongoose.Schema({
    _id: Number,
    name: String,
    email: String,
    appointments:[
        {
            date:Date,
            startTime:Date,
            endTime:Date,
            staffID:Number,
            staffName:String,
            confirmed:Boolean
        }
    ]
})
module.exports = mongoose.model('StudentAppointment',StudentAppointment,'studentAppointment')