let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
let morgan = require('morgan')
let mongoose = require('mongoose')

// database schemas
let ProgramList = require('./ProgramList')
let ProgramCourses = require('./ProgramCourses')
let Courses = require('./Courses')
let StudentAppointments = require('./StudentAppointments')

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

app.put('/student',(req,res) => {
    StudentAppointments.find({}, (err,studentAppointments) =>{
        if(err) console.error(err)
        studentAppointments._id = req.body._id
        studentAppointments.name = req.body.name
        studentAppointments.email = req.body.email
        studentAppointments.appointments = req.body.appointments
    })
})

app.listen(process.env.PORT || 8081)