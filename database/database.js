let mongoose = require('mongoose')

const user = 'student';
const password = 'password1';
const connectionString = `mongodb://${user}:${password}@ds121624.mlab.com:21624/course-viewer`

mongoose.connect(connectionString, {useNewUrlParser: true }, err => {
    if(err) throw err
    console.log("Connected to database!")
})