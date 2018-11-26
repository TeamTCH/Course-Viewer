<template>
    <v-container text-xs-center>
        <v-layout column>
            <header>
                <h1>Programs List</h1>    
            </header>
            <v-layout row>
                <v-flex xs10>
                    <v-text-field 
                        autofocus 
                        append-icon="close" 
                        @click:append="clearSearch" 
                        v-model="programSearch" 
                        placeholder="Enter program name..."
                    ></v-text-field>
                </v-flex>
                <v-flex xs2>
                    <v-btn color="info" @click="toggleView">{{ viewAllText }}</v-btn>
                </v-flex>
            </v-layout>
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
                <v-pagination v-model="page" :length="itemsPerPage-1" @input="test"></v-pagination>
            </div>

            <div v-else>
                <template v-for="(program, index) in filterPrograms">
                    <v-list-tile :key="index" :to="`programs/${program.link}`">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ program.name }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </div>
            
        </v-layout>
    </v-container>
</template>

<script>
import programs from '../assets/data/ProgramList.json'
    export default {
        data() {
            return {
                programSearch: "",
                programs: programs,
                page: 1,
                splitProgramList: [],
                itemsPerPage: 0,
                viewAll: false,
                viewAllText: "Show All"
            }
        },
        created() {
            this.itemsPerPage = Math.round(this.programs.length / 10)
        },
        mounted() {
            this.test()
            
        },
        methods: {
            test() {
                let from = (this.page * this.itemsPerPage) - this.itemsPerPage
                let to = (this.page * this.itemsPerPage)
                this.splitProgramList = this.programs.slice(from, to)
                return this.splitProgramList
            },
            toggleView() {
                this.viewAll = !this.viewAll
                this.viewAll ? this.viewAllText = 'Show Less' : this.viewAllText = 'Show All'
                this.programSearch = ''
            },
            clearSearch() {
                this.programSearch = ''
            }
        },
        computed: {
            filterPrograms() {
                return this.programs.filter(programs => {
                    return programs.name.toLowerCase().indexOf(this.programSearch.toLowerCase()) > -1
                })
            }
        }
    }
</script>

<style scoped>

</style>