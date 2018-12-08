<template>
    <v-container align-content-center>
        <v-layout column>

            <v-dialog v-model="showDetails" width="450px">
                <v-card height="415px">
                    <v-card-title class="headline grey lighten-2" primary-title >
                            Appointment Details
                    </v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-tile>Name: {{ appointmentDetails.studentName }}</v-list-tile>
                            <v-list-tile>Student ID: {{ appointmentDetails.studentID }}</v-list-tile>
                            <v-list-tile>Student Email: {{ appointmentDetails.StudentEmail }}</v-list-tile>
                            <v-list-tile>Date of appointment: {{ appointmentDetails.date }} at {{ appointmentDetails.startTime }}</v-list-tile>
                            <v-list-tile>Reason for appointment: {{ appointmentDetails.message }}</v-list-tile>
                        </v-list>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="showDetails = false">
                        Close
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="requestAppointment" width="35%" min-width="360px" persistent>
                
                <v-card height="50%">
                    <v-card-title>
                        Request Appointment
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field label="Full Name*" :value="student.name" required></v-text-field>
                                 </v-flex>
                                 <v-flex xs12 sm6 md4>
                                    <v-text-field label="Student ID*" :value="student.studentID" required hint="Found on the back of your One Card" persistent-hint></v-text-field>
                                 </v-flex>
                                 <v-flex xs12 sm6 md4>
                                    <v-text-field label="Email*" :value="student.email" required></v-text-field>
                                 </v-flex>
                                 <v-flex xs12 sm6>
                                    <v-select :items="staff" item-text="name" item-value="staff" @change="getProfessor" label="Professor*" required></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <!-- <v-text-field label="Requested Date*" required></v-text-field> -->
                                    <v-menu
                                        ref="dateMenu"
                                        :close-on-content-click="false"
                                        v-model="dateMenu"
                                        :nudge-right="40"
                                        :return-value.sync="date"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                    >
                                        <v-text-field
                                        slot="activator"
                                        v-model="date"
                                        label="Select a Date*"
                                        prepend-icon="event"
                                        readonly
                                        required
                                        ></v-text-field>
                                        <v-date-picker v-model="date" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="dateMenu = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.dateMenu.save(date)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs11 sm5>
                                    <v-menu
                                        ref="menu"
                                        :close-on-content-click="false"
                                        v-model="timeMenu"
                                        :nudge-right="40"
                                        :return-value.sync="time"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        max-width="290px"
                                        min-width="290px"
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="time"
                                            label="Select a time*"
                                            prepend-icon="access_time"
                                            readonly
                                            required
                                        ></v-text-field>
                                        <v-time-picker
                                            v-if="timeMenu"
                                            v-model="time"
                                            full-width
                                            @change="$refs.menu.save(time)"
                                        ></v-time-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field label="Reason for Appointment*" required v-model="newAppointment.message"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="requestAppointment = false">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click="createAppointment(), requestAppointment = false">Create Appointment</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-flex xs6>
                <v-card class="mx-2">
                    <v-card-title primary-title>
                        <h3>Current Appointments</h3>
                        <v-btn slot="activator" color="primary" dark @click="requestAppointment = true">Create Appointment</v-btn>
                    </v-card-title>
                    <v-responsive>
                        <v-list two-line>
                            <template v-for="(item, key) in appointments">
                                <v-divider :key="item._id+key"></v-divider>
                                <v-list-tile :key="key" @click="viewAppointmentDetails(item)">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ item.staffName }}</v-list-tile-title>
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
import StudentServices from '@/services/StudentService'
import StaffServices from '@/services/StaffServices'
import {GenerateID} from '../assets/js/GetData';
    export default{
        data(){
            return{
                student:[],
                appointments:[],
                appointmentDetails:[],
                requestAppointment: false,
                newAppointment: {
                    staffName: "",
                    staffID: "",
                    message: ""
                },
                showDetails:false,
                valid:true,
                date: new Date().toISOString().substr(0, 10),
                time: null,
                dateMenu: false,
                timeMenu: false,
                staff: []
            }
        },
        async created(){
            await StudentServices.fetchStudentAppointments({id:991395035}).then(response => {
                // console.log(response.data[0])
                this.student = response.data[0]
            })
            await StaffServices.getStaff().then(response => {
                // console.log(response.data.staff)
                this.staff = response.data.staff
            })

            this.getAppointmentList(this.student.appointments)
            console.log(this.student)
        },
        methods: {
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
            viewAppointmentDetails(details){
                this.appointmentDetails = details
                this.appointmentDetails.startTime = this.convertedTime(this.appointmentDetails.startTime)
                this.showDetails = true;
            },
            //todo: implement createAppointment
            async createAppointment(){
                // let obj = this.student.appointments[appointments.length]
                
                let appointmentID = GenerateID()
                let studentObj = {
                    appointmentID: appointmentID,
                    date: this.date,
                    startTime: this.time,
                    staffID: this.newAppointment.staffID,
                    staffName:this.newAppointment.staffName,
                    message: this.newAppointment.message,
                    confirmed: false
                }

                let staffObj = {
                    appointmentID: appointmentID,
                    date: this.date,
                    startTime: this.time,
                    studentID: this.student.studentID,
                    studentName: this.student.name,
                    studentEmail: this.student.email,
                    message: this.newAppointment.message,
                    confirmed: false
                }

                console.log(studentObj)
                console.log(staffObj)
                
                console.log(this.student.studentID)
                await StudentServices.AddAppointment({
                    id: this.student.studentID,
                    appointment: studentObj,
                    newAppointment: true
                }).then(res => {
                    console.log(res)
                })

                await StaffServices.AddAppointment({
                    id: this.newAppointment.staffID,
                    appointment: staffObj,
                    newAppointment: true
                }).then(res => {
                    console.log(res)
                })

            },
            getAppointmentList(appointments) {
                for(let appointment of appointments) {
                    this.appointments.push(appointment)
                }
            },
            getProfessor(name) {
                this.newAppointment.staffName = name
                for(let staff of this.staff) {
                    if(staff.name === name) {
                        this.newAppointment.staffID = staff.staffID
                    }
                }
            }
        }
    }

</script>