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
                        width="1024px"
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
                    <v-expansion-panel>
                        <v-expansion-panel-content 
                            v-for="(semester, key) in courses.semesters" 
                            :key="key"
                        >
                            <div slot="header">{{ semester.semester }}</div>
                            <v-card class="elevation-2">
                                <v-responsive>
                                    <v-data-table
                                        :headers="tableHeaders"
                                        :items="semester.courses"
                                        class="elevation-1"
                                        hide-actions
                                        disable-initial-sort

                                    >
                                        <template slot="items" slot-scope="props">
                                            <tr @click="viewCourseInfo(props.item.courseCode)">
                                                <td>{{ props.item.courseCode }}</td>
                                                <td class="text-xs-left">{{ props.item.courseName }}</td>
                                                <td class="text-xs-left">{{ props.item.credits }}</td>
                                            </tr>
                                        </template>
                                    </v-data-table>
                                </v-responsive>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
import Courses from '../assets/data/Courses.json'
import { ViewCourseInfo, requestDataById } from '../assets/js/GetData.js'
import ProgramsService from '@/services/ProgramsService'
    export default {
        data() {
            return {
                courses: [],
                programName: "",
                modal: false,
                url: "",
                tableHeaders: [
                    {
                        text: 'Course Code',
                        value: 'code',
                        sortable: false
                    },
                    {
                        text: 'Course Name',
                        value: 'name',
                        sortable: false
                    },
                    {
                        text: 'Credits',
                        value: 'credits',
                        sortable: false
                    }
                ],
                loading: false
            }
        },
        async created() {
            this.programName = (this.$route.params.id).replace(new RegExp('-', 'g'), ' ').split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')

            await ProgramsService.fetchCourse({id: 1}).then(response => {
                this.courses = response.data[0]
                console.log(response.data)
            })
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
                return height
            }
        }
    }
</script>

<style scoped>
    tr:nth-child(odd) {
        background-color: #dddddd;
    }
</style>