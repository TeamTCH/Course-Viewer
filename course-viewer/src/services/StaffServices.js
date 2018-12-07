import Api from './Api'

export default {
    fetchStaff(params) {
        return Api().get(`staff/${params.id}`)
    },
    updateStaffAppointment(params) {
        return Api().put(`staff/${params.id}`, params)
    }
}