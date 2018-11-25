<template>
    <v-container fluid>
        <v-layout column>
            <ul>
                <li class="" v-for="(program, key) in programs" :key="key">{{ program.name }}</li>
            </ul>
        </v-layout>
    </v-container>
</template>

<script>
import programs from '../assets/data/ProgramList.json'
    export default {
        name: 'Programs',
        data() {
            return {
                programs: programs
            }
        }
    }
</script>

<style scoped>
    li {
        list-style-type: none;
    }
</style>