<template>
    <v-container text-xs-center>
        <v-layout column>
            <header>
                <h1>Programs List</h1>    
            </header>
            <v-btn absolute dark fab right color="light-blue"  onclick="window.open('/usermessenger', '_blank', 'width=600,height=700')" >
                <v-icon>message</v-icon>
            </v-btn>
            <v-layout row>
                <v-flex xs10>
                    <v-text-field 
                        autofocus 
                        append-icon="close" 
                        @click:append="ClearSearch" 
                        v-model="programSearch" 
                        placeholder="Enter program name..."
                    ></v-text-field>
                </v-flex>
                <v-flex xs2>
                    <v-btn color="info" @click="ToggleView">{{ viewAllText }}</v-btn>
                </v-flex>
            </v-layout>
            <!-- Loading Screen -->
            <v-layout v-if="loading" row wrap justify-center align-content-center>
                <v-flex xs12>
                    <h3>Loading...</h3>
                </v-flex>
                <v-flex xs12>
                    <v-progress-circular indeterminate color="primary" :size="70"></v-progress-circular>
                </v-flex>
            </v-layout>
            <!-- Pagination view, breaks program list up into different pages -->
            <div v-else>
                <!-- <div v-for="(test, key) in testArr" :key="key">{{test.title}}</div> -->
                <div v-if="programSearch=='' && !viewAll">
                    <v-list>
                        <template v-for="(program, index) in splitProgramList">
                            <v-list-tile :key="index" :to="`programs/${program.link}`">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ program.name }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-list>
                    <v-pagination v-model="page" :length="10" @input="ProgramPagination"></v-pagination>
                </div>
                <!-- Shows full list of programs, if they want that. also switches to this view if user starts searching -->
                <div v-else>
                    <v-list>
                        <template v-for="(program, index) in FilterPrograms">
                            <v-list-tile :key="index" :to="`programs/${program.link}`">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ program.name }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-list>
                </div>
            </div>
            
        </v-layout>
    </v-container>
</template>

<script>
import { requestData } from '../assets/js/GetData.js'
import ProgramsService from '@/services/ProgramsService'
    export default {
        data() {
            return {
                programSearch: "",
                programs: [],
                page: 1,
                splitProgramList: [],
                itemsPerPage: 0,
                viewAll: false,
                viewAllText: "Show All",
                loading: true,
                testArr: []
            }
        },
        async created() {
            // grab list of programs from the backend
            await ProgramsService.fetchPrograms().then(response => {
                this.programs = response.data.programs
            }).then(() => {
                this.itemsPerPage = Math.ceil(this.programs.length / 10)
                this.ProgramPagination()
                this.loading = false
            })
            console.log(this.programs)
        },
        methods: {
            ProgramPagination() {
                let from = (this.page * this.itemsPerPage) - this.itemsPerPage
                let to = (this.page * this.itemsPerPage)
                console.log(this.programs.length)
                this.splitProgramList = this.programs.slice(from, to)
                return this.splitProgramList
            },
            ToggleView() {
                this.viewAll = !this.viewAll
                this.viewAll ? this.viewAllText = 'Show Less' : this.viewAllText = 'Show All'
                this.programSearch = ''
            },
            ClearSearch() {
                this.programSearch = ''
            }
        },
        computed: {
            FilterPrograms() {
                return this.programs.filter(programs => {
                    return programs.name.toLowerCase().indexOf(this.programSearch.toLowerCase()) > -1
                })
            }
        }
    }
</script>

<style scoped>
.v-progress-circular {
    margin: 1rem
}
</style>