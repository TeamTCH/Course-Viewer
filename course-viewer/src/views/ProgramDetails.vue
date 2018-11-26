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
                                                <td>{{ course.courseName }}</td>
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
    export default {
        data() {
            return {
                courses: Courses,
                programName: ""
            }
        },
        created() {
            this.programName = (this.$route.params.id).replace(new RegExp('-', 'g'), ' ').split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
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