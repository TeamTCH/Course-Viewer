let mongoose = require('mongoose')

const user = 'student';
const password = 'password1';

mongoose.connect(`mongodb://${user}:${password}@ds121624.mlab.com:21624/course-viewer`, err => {
    if(err) throw err
    console.log("Connected to database!")
})