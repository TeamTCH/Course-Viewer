import Api from './Api'

// gets all programs
export default {
    // Gets all programs
    fetchPrograms() {
        return Api().get('courses')
    },
    fetchStudentAppointments(){
        return Api.get('studentAppointment')
    },
    pushStudentAppointments(){
        
    }
}