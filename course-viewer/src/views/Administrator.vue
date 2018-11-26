<template>
  <v-container text-xs-center>
        <v-layout column>
            <header>
                <h1>Options</h1>
            </header>
        </v-layout>
        <v-layout row>
                <v-btn color="success" @click="ViewPrograms" href="/editprograms" >View All Programs</v-btn>
        </v-layout>
        <v-layout row>
                <!-- <v-btn color="success" >View All Courses</v-btn> -->
        </v-layout>
  </v-container>
</template>

<script>
    export default {

        methods: {
            ViewPrograms() {
                //route to view programs?
                console.log("GO TO VIEW PROGRAMS");
            }
        }
    }
</script>

<style scoped>

</style>