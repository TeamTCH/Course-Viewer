import Api from './Api'

export default {
    getStaff() {
        return Api().get('staff')
    },
    fetchStaff(params) {
        return Api().get(`staff/${params.id}`)
    },
    updateStaffAppointment(params) {
        return Api().put(`staff/${params.id}`, params)
    },
    AddAppointment(params) {
        return Api().put(`staff/${params.id}`, params)
    }
}