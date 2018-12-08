<template>
  <v-container text-xs-center>
        <v-layout column>
            <header>
                <h1>Options</h1>
            </header>
        </v-layout>

        <header>
                <h2 align="left">Administrator Functions</h2>
        </header>
        <v-layout row>
                <v-btn color="success" @click="ViewPrograms" href="/editprograms" >View All Programs</v-btn>
        </v-layout>
        <br>
  </v-container>
</template>

<script>
    export default {

        methods: {
            ViewPrograms() {
                //route to view programs?
                console.log("GO TO VIEW PROGRAMS");
            },

            AccessRepChatManager() {
                //route to view programs?
                console.log("GO TO REP CHAT MANAGER");
            }
        }
    }
</script>

<style scoped>

</style>