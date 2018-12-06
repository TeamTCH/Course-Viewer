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

// Gets data from the database based on the collection
export async function requestData(collection) {
    let data = []
    let url = `https://api.mlab.com/api/1/databases/course-viewer/collections/${collection}?apiKey=${key}`
    await axios.get(url)
            .then(response => {
                console.log(response.data.length)
                data = response.data                
            })
    return data
}

export async function requestDataById(collection, id, query) {
    let data = []
    // query based on id
    let url = `https://api.mlab.com/api/1/databases/course-viewer/collections/${collection}?q={${query}:${id}}&fo=true&apiKey=${key}`
    await axios.get(url)
            .then(response => {
                console.log(response.data.length)
                data = response.data                
            })
    return data
}