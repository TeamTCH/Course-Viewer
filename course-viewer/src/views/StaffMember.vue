<template>
    <v-container align-content-center>
        <v-layout row wrap>
            <v-dialog
                v-model="showDetails"
                width="450px"
            >
                <v-card height="415px">
                    <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                        >
                            Appointment Details
                    </v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-tile>Name: {{ appointmentDetails.studentName }}</v-list-tile>
                            <v-list-tile>Student ID: {{ appointmentDetails.studentId }}</v-list-tile>
                            <v-list-tile>Student Email: {{ appointmentDetails.StudentEmail }}</v-list-tile>
                            <v-list-tile>Date of appointment: {{ appointmentDetails.date }} at {{ appointmentDetails.startTime }}</v-list-tile>
                            <v-list-tile>Reason for appointment: {{ appointmentDetails.message }}</v-list-tile>
                        </v-list>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        flat
                        @click="showDetails = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        v-if="!appointmentDetails.confirmed"
                        color="error"
                        flat
                        @click="AcceptAppointment(false)"
                    >
                        Decline
                    </v-btn>
                    <v-btn
                        v-if="!appointmentDetails.confirmed"
                        color="success"
                        flat
                        @click="AcceptAppointment(true)"
                    >
                        Accept
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-flex xs6>
                <v-card class="mx-2">
                    <v-card-title primary-title>
                        <h3>Current Appointments</h3>
                    </v-card-title>
                    <v-responsive>
                        <v-list two-line>
                            <template v-for="(item, key) in currentAppointments">
                                <v-divider :key="item._id+key"></v-divider>
                                <v-list-tile :key="key" @click="viewAppointmentDetails(item)">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ item.studentName }}</v-list-tile-title>
                                        <v-list-tile-sub-title>Time of appointment: {{ convertedTime(item.startTime) }}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </v-responsive>
                </v-card>
            </v-flex>
            <v-flex xs6>
                <v-card class="mx-2">
                    <v-card-title primary-title>
                        <h3>Pending Appointments</h3>
                    </v-card-title>
                    <v-responsive>
                        <v-list two-line>
                            <template v-for="(item, key) in pendingAppointments">
                                <v-divider :key="item._id+key"></v-divider>
                                <v-list-tile :key="key" @click="viewAppointmentDetails(item)">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ item.studentName }}</v-list-tile-title>
                                        <v-list-tile-sub-title>Time of appointment: {{ convertedTime(item.startTime) }}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </v-responsive>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import StaffServices from '@/services/StaffServices'
import StudentServices from '@/services/StudentService'
import { GenerateID } from '../assets/js/GetData';
    export default {
        data() {
            return {
                staffMember: [],
                pendingAppointments: [],
                appointmentDetails: [],
                currentAppointments: [],
                showDetails: false,
                valid: true
            }
        },
        async created() {
            await StaffServices.fetchStaff({id: 1}).then(response => {
                this.staffMember = response.data[0]
            })
            this.filterAppointments(this.staffMember.appointments)
                // console.log(this.staffMember.appointments)
        },
        methods: {
            
            filterAppointments(appointments) {
                for(let appointment of appointments) {
                    appointment.confirmed ? this.currentAppointments.push(appointment) : this.pendingAppointments.push(appointment)
                }
            },
            convertedTime(time) {
                // Check correct time format and split into components
                time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)?$/) || [time];

                if (time.length > 1) { // If time format correct
                    time = time.slice (1);  // Remove full string match value
                    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
                    time[0] = +time[0] % 12 || 12; // Adjust hours
                }
                return time.join (''); // return adjusted time or original string
            },
            viewAppointmentDetails(details) {
                this.appointmentDetails = details
                this.appointmentDetails.startTime = this.convertedTime(this.appointmentDetails.startTime)
                this.showDetails = true
            },
            async AcceptAppointment(accept) {
                console.log(accept)
                this.showDetails = false
                
                if(accept) {
                    console.log(this.appointmentDetails.studentId)
                    this.appointmentDetails.confirmed = true
                    for(let appointment of this.pendingAppointments) {
                        console.log(appointment)
                        if(this.appointmentDetails.appointmentID == appointment.appointmentID) {
                            appointment.confirmed = this.appointmentDetails.confirmed
                            let index = this.pendingAppointments.indexOf(appointment)
                            this.currentAppointments.push(this.pendingAppointments.splice(index, 1)[0])
                        }
                    }
                    await StaffServices.updateStaffAppointment({
                        id: this.staffMember.staffID,
                        appointmentID: this.appointmentDetails.appointmentID,
                        confirmed: this.appointmentDetails.confirmed,
                        newAppointment: false
                    }).then(res => {
                        console.log(res)
                        
                    })
                    await StudentServices.updateStudentAppointment({
                        id: this.appointmentDetails.studentId,
                        appointmentID: this.appointmentDetails.appointmentID,
                        confirmed: this.appointmentDetails.confirmed,
                        newAppointment: false
                    }).then(res => {
                        console.log(res)
                    })
                    console.log("hello")

                }
            }
            // ,async test() {
            //     let obj = this.staffMember.appointments[0]
            //     obj.confirmed = false,
            //     obj.appointmentID = GenerateID()
            //     obj.message = 'Hello!'
            //     await StaffServices.AddAppointment({
            //         id: this.staffMember.staffID,
            //         appointment: obj,
            //         newAppointment: true
            //     }).then(res => {
            //         console.log(res)
            //     })
            // }
        },
        computed: {
            findHeight() {
                let height = window.innerHeight * 0.9
                return height
            }
        }
    }
</script>

<style scoped>

</style>