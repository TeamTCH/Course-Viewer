let axios = require('axios')
import { key } from '../data/constants'


// get the course information based on the course code
export function ViewCourseInfo(courseCode) {
    console.log(courseCode)

    let courseCodes = courseCode.split(" ", 2)
    let url = ''

    switch(courseCodes[0]) {
        case "COWT": 
            url = `https://ulysses.sheridanc.on.ca/coutline/coutlineview.jsp?appver=ps&subjectCode=${courseCodes[0]}&courseCode=${courseCodes[1]}`
            break
        case "N/A" :
            url = `N/A`
            break
        default:
            url = `https://ulysses.sheridanc.on.ca/coutline/coutlineview_sal.jsp?appver=sal&subjectCode=${courseCodes[0]}&courseCode=${courseCodes[1]}`
            break
    }
    return url
}

export function GenerateID() {
    return 'id-' + Math.random().toString(36).substr(2, 16)
}