<template>
    <v-container text-xs-center>
        <v-layout column>
            <header>
                <h1>Programs List</h1>    
            </header>
            <v-layout row>
                <v-text-field autofocus v-model="programSearch" placeholder="Enter program name..." @keypress.enter="Search"></v-text-field>
                <!-- <button @click="Search">Search</button> -->
                <v-btn color="success" @click="Search">Search</v-btn>
            </v-layout>
            <div>
                <!-- <Programs /> -->
                <!-- <v-data-table></v-data-table> -->
                <ul>
                <li class="" v-for="(program, key) in programs" :key="key">{{ program.name }}</li>
            </ul>
            </div>
        </v-layout>
    </v-container>
</template>

<script>
// import Programs from '@/components/ProgramList.vue'
import programs from '../assets/data/ProgramList.json'
    export default {
        // components: {
        //     Programs
        // },
        data() {
            return {
                programSearch: "",
                programs: programs
            }
        },
        methods: {
            Search() {
                console.log(this.programSearch);
            }
        }
    }
</script>

<style scoped>

</style>