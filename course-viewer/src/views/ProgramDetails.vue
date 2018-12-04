<template>
    <v-container text-xs-center>
        <v-tabs fixed-tabs>
            <v-tab>Overview</v-tab>
            <v-tab>Courses</v-tab>
            <v-tab-item>
                <v-card flat>
                    <v-card-title primary-text>
                        <h2>{{ programName }}</h2>
                    </v-card-title>
                    <v-card-text>{{courses.programDescription}}</v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-dialog
                        v-model="modal"
                        width="1000px"
                        :scrollable="true"
                    >
                        <v-card :height="findHeight">
                            <v-container  v-if="url === 'N/A'" fluid text-xs-center>
                                <v-layout  row wrap align-content-center>
                                    <v-flex xs12 align-self-center>
                                        <h1>Oops, theres no information here!</h1>
                                    </v-flex>
                                    <v-flex xs12 align-self-center>
                                        <v-icon x-large color="blue">fas fa-frown</v-icon>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <v-responsive v-else height="100%" v-html="url"></v-responsive>
                        </v-card>
                    </v-dialog>
                    <v-timeline>
                        <v-timeline-item 
                            v-for="(semester, key) in courses.semesters" 
                            :key="key"
                        >
                            <v-card class="elevation-2">
                                <v-card-title class="headline">{{ semester.semester }}</v-card-title>
                                <v-card-text>
                                    <table>
                                        <thead>
                                            <td>Course Code</td>
                                            <td>Course Name</td>
                                            <td>Credits</td>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(course, key) in semester.courses" :key="key">
                                                <td>{{ course.courseCode }}</td>
                                                <td>
                                                    <a @click="viewCourseInfo(course.courseCode)">{{ course.courseName }}</a>
                                                </td>
                                                <td>{{ course.credits }}</td>
                                            </tr>
                                        </tbody>
                                    </table>                                   
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                    </v-timeline>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
import Courses from '../assets/data/Courses.json'
import { ViewCourseInfo } from '../assets/js/GetData.js'
    export default {
        data() {
            return {
                courses: Courses,
                programName: "",
                modal: false,
                url: ""
            }
        },
        created() {
            this.programName = (this.$route.params.id).replace(new RegExp('-', 'g'), ' ').split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
        },
        methods: {
            viewCourseInfo(code) {
                let url = ViewCourseInfo(code)
                if(url === 'N/A') {
                    this.url = `N/A`
                } else {
                    this.url = `<object data="${url}" style="width:100%; height:100%"></object>`;
                }
                this.modal = true
                console.log(url)
            }
        },
        computed: {
            findHeight() {
                let height = window.innerHeight * 0.9
                console.log(height)
                return height
            }
        }
    }
</script>

<style scoped>
   table {
       border-collapse: collapse;
        width: 100%;
   }
   td, thead {
       border: 1px solid #424141;
    text-align: left;
    padding: 8px;
   }
    tr:nth-child(even) {
        background-color: #dddddd;
    }
</style>