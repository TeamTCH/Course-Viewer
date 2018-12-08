import Api from './Api'

// gets all programs
export default {
    // Gets all programs
    fetchPrograms() {
        return Api().get('courses')
    },
    fetchStudentAppointments(params){
        return Api().get(`student/${params.id}`)
    },
    pushStudentAppointments(){
        
    },
    updateStudentAppointment(params) {
        return Api().put(`student/${params.id}`, params)
    },
    AddAppointment(params) {
        return Api().put(`student/${params.id}`, params)
    }
}