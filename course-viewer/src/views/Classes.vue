<template>
  <v-container text-xs-center>
    <v-layout column>
      <header>
        
      </header>

      <div v-for="(course,index) in courses" :key="index" border="1">
        <v-list>
          <template>
            <v-list-tile to="#">
              <v-list-tile-content>
                <v-list-tile-title>{{course.code}} - {{course.name}}</v-list-tile-title>
                <v-list-tile-sub-title>{{ course.instructor }}, {{course.times[0].date}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import courses from '../assets/data/classes.json'
export default {
  data(){
    return{
      courses: courses
    }
  },
  methods: 
  {
    Search()
    {
      console.log(this.programSearch);
    }
  }
}
</script>
