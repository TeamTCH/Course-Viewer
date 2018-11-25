<template>
    <v-container text-xs-center>
        <v-layout column>
            <header>
                <h1>Programs List</h1>    
            </header>
            <v-layout row>
                <v-text-field autofocus v-model="programSearch" placeholder="Enter program name..."></v-text-field>
                <!-- <button @click="Search">Search</button> -->
                <!-- <v-btn color="success" @click="Search">Search</v-btn> -->
            </v-layout>
            <div>
                <!-- <Programs /> -->
                <v-list>
                    <template v-for="(program, index) in filterPrograms">
                        <v-list-tile :key="index" to="#">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ program.name }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-list>
                
            </div>
        </v-layout>
    </v-container>
</template>

<script>
// import Programs from '@/components/ProgramList.vue'
import programs from '../assets/data/ProgramList.json'
    export default {
        data() {
            return {
                programSearch: "",
                programs: programs
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