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
    export default {
        name: 'Programs',
        data() {
            return {
                programs : [
                    {
                        "name": "Accounting, Business Administration"
                    },
                     {
                        "name": "Animal Care"
                    },
                    {
                        "name": "Business"
                    },
                    {
                        "name": "Computer Animation"
                    }
                ]  
            }
        }
    }
</script>

<style scoped>
    li {
        list-style-type: none;
    }
</style>