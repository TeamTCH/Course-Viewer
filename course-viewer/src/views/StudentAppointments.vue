<template>
    <v-container align-content-center>
        <v-layout column>

            <v-dialog v-model="showDetails" width="450px" >
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

            <v-flex xs6>
                <v-card class="mx-2">
                    <v-card-title primary-title>
                        <h3>Current Appointments</h3>
                        <v-dialog v-model="appointments" width="35%" min-width="360px">
                <v-btn slot="activator" color="primary" dark>Create Appointment</v-btn>
                <v-card height="50%">
                    <v-card-title>
                        Request Appointment
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field label="Full Name*" required></v-text-field>
                                 </v-flex>
                                 <v-flex xs12 sm6 md4>
                                    <v-text-field label="Student ID*" required hint="Found on the back of your One Card" persistent-hint></v-text-field>
                                 </v-flex>
                                 <v-flex xs12 sm6 md4>
                                    <v-text-field label="Email*" required></v-text-field>
                                 </v-flex>
                                 <v-flex xs12 sm6>
                                    <v-select :items="['Aeiman Gadafi', 'Magdin Stoica', 'Alexander Babanski', 'Tarek El Salti']" label="Professor*" required></v-select>
                                </v-flex>
                                 <v-flex xs12 sm6 md4>
                                    <v-text-field label="Requested Date*" required></v-text-field>
                                 </v-flex>
                                 <v-flex xs12 sm6 md4>
                                    <v-text-field label="Reason for Appointment*" required></v-text-field>
                                 </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="appointments = false">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click="createAppointment('I want to discuss an assignment'), requestAppointment = false">Create Appointment</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
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
import {GenerateID} from '../assets/js/GetData';
    export default{
        data(){
            return{
                student:[],
                appointments:[],
                appointmentDetails:[],
                showDetails:false,
                valid:true
            }
        },
        async created(){
            await StudentServices.fetchStudentAppointments({id:1}).then(response => {
                this.student = response.data[0]
            })
            this.getAppointmentList(this.student.appointments)
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
            async createAppointment(_message){
                let obj = this.student.appointments[appointments.length]
                obj.confirmed = false
                obj.appointmentID = GenerateID();
                obj.message = _message

                await StudentServices.AddAppointment({
                    id:this.student.studentID,
                    appointment:obj,
                    newAppointment:true
                }).then(res => {
                    console.log(res)
                })

            }
        }
    }

</script>