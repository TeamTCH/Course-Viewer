let axios = require('axios')
import { key } from '../data/constants'

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

export async function requestData(collection) {
    let data = []
    await axios.get(`https://api.mlab.com/api/1/databases/course-viewer/collections/${collection}?apiKey=${key}`)
            .then(response => {
                console.log(response.data.length)
                data = response.data                
            })
    console.log(data)
    return data
}
