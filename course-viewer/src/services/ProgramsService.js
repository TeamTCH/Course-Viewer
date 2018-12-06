import Api from './Api'

// gets all programs
export default {
    // Gets all programs
    fetchPrograms() {
        return Api().get('programs')
    },
    // Gets Program details (we only have one entry right now)
    fetchCourse(params) {
        return Api().get('programDetails/'+params.id)
    }
}