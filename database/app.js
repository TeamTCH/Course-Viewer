let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
let morgan = require('morgan')
let mongoose = require('mongoose')

// database schemas
let ProgramList = require('./ProgramList')
let ProgramCourses = require('./ProgramCourses')
let Courses = require('./Courses')
let StudentAppointments = require('./StudentAppointment')
let Staff = require('./Staff')

// db credentials
const user = 'student';
const password = 'password1';
const connectionUrl = `mongodb://${user}:${password}@ds121624.mlab.com:21624/course-viewer`

// connect to the database
mongoose.connect(connectionUrl, { useNewUrlParser: true })

let db = mongoose.connection

// in case of an error while trying to connect to the database
db.on("error", console.error.bind(console, "connection error"))

db.once("open", (callback) => {
    console.log("Connection established!")
})

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Performing CRUD operations

// Get all programs
app.get('/programs', (req, res) => {
    ProgramList.find({}, (err, programs) => {
        if(err) console.error(err)
        res.send({
            programs: programs
        })
    })
})

// Get program details by id (currently its just the programCode, which is 1)
app.get('/programDetails/:id', (req, res) => {
    ProgramCourses.find({programCode: req.params.id}, (err, courses) => {
        if(err) console.error(err)
        res.send(courses)
    }).limit(1)
})

app.get('/courses',(req,res) => {
    Courses.find({}, (err,courses) => {
        if(err) console.error(err)
        res.send({
            courses:courses
        })
    })
})

// app.put('/student',(req,res) => {
//     StudentAppointments.find({}, (err,studentAppointments) =>{
//         if(err) console.error(err)
//         studentAppointments._id = req.body._id
//         studentAppointments.name = req.body.name
//         studentAppointments.email = req.body.email
//         studentAppointments.appointments = req.body.appointments
//     })
// })

// Get student by studentID
app.get('/student/:id', (req, res) => {
    StudentAppointments.find({studentID: req.params.id}, (err, student) => {
        if(err) console.error(err)
        res.send(student)
    }).limit(1)
})

// Update existing appointment or add appointment for student (depends on 'newAppointment' value {true || false})
app.put('/student/:id', (req, res) => {
    if(!req.body.newAppointmnet) {
        StudentAppointments.findOneAndUpdate({
            'studentID': req.params.id,
            'appointments': {
                '$elemMatch': {
                    'appointmentID': req.body.appointmentID
                }
            }
        },
        {
            '$set': {'appointments.$.confirmed': req.body.confirmed}
        },
        {
            new: true,
            upsert: false
        },
        (err, result) => {
            if(err) console.log(err)
            console.log(result)
            res.send({
                success: true
            })
        })
    } else {
        StudentAppointments.findOneAndUpdate({
            'staffID': req.params.id
        },
        {
            '$push': {'appointments': req.body.appointment}
        },
        {
            new: true,
            upsert: true
        },
        (err, result) => {
            if(err) console.log(err)
            console.log(result)
            res.send({
                success: true
            })
        })
    }
    
})

// Getting all staff members (not sure if this even needs to be here)
app.get('/staff', (req, res) => {
    Staff.find({}, (err, staff) => {
        if(err) console.error(err)
        res.send({
            staff: staff
        })
    }).limit(1)
})

// Getting one staff member, would need some sort of authentication if it were a real application
app.get('/staff/:id', (req, res) => {
    Staff.find({staffID: req.params.id}, (err, staffMember) => {
        if(err) console.error(err)
        res.send(staffMember)
    }).limit(1)
})

// Update existing appointment or add appointment for staff(depends on 'newAppointment' value {true || false})
app.put('/staff/:id', (req, res) => {
    if(!req.body.newAppointment) {
        Staff.findOneAndUpdate(
            {
                'staffID': req.params.id, 
                'appointments': {
                    '$elemMatch': {
                        'appointmentID': req.body.appointmentID
                    }
                }
            }, 
            {
                '$set': {'appointments.$.confirmed': req.body.confirmed}
            }, 
            {
                new: true,
                upsert: false
            },
            (err, result) => {
                if(err) console.log(err)
                console.log(result)
                res.send({
                    success: true
                })
        })
    } else {
        Staff.findOneAndUpdate({
            'staffID': req.params.id
        },
        {
            '$push': {'appointments': req.body.appointment}
        },
        {
            new: true,
            upsert: true
        },
        (err, result) => {
            if(err) console.log(err)
            console.log(result)
            res.send({
                success: true
            })
        })
    }
    
})



app.listen(process.env.PORT || 8081)