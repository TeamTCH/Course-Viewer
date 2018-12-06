let mongoose = require('mongoose')

let programCoursesSchema = new mongoose.Schema({
    programName: String,
    programDescription: String,
    programCode: Number,
    semesters: [
        {
            semester: String,
            courses: [
                {
                    courseName: String,
                    courseCode: String,
                    credits: Number
                }
            ],
            totalCredits: Number
        }
    ]
})

module.exports = mongoose.model('Courses', programCoursesSchema, 'programDetails')