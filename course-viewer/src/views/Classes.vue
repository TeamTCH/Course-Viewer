<template>
  <v-container text-xs-center>
    <v-layout column>
      <header>
        <h1>Enrolled Classes</h1>
        <br>
      </header>
      <div v-for="(course,index) in courses" :key="index" border="1">
        <v-list>
          <template>
            <v-list-tile to="#">
              <v-list-tile-content @click="viewDetails(course.code)">
                <v-list-tile-title>{{course.code}} - {{course.name}}</v-list-tile-title>
                <v-list-tile-sub-title>{{ course.instructor }}, {{course.times[0].date}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </div>

      <div>
        <br>
        <iframe id="classDetails" src="about:blank" width="100%" height="768" frameborder="0" scrolling="yes"></iframe>
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
    viewDetails(code)
    {
      var courseCodes = code.split(" ", 2)
      var str = courseCodes[1]
      str = str.substring(0, str.length - 4);
      courseCodes[1] = str
      var url = "https://ulysses.sheridanc.on.ca/coutline/coutlineview_sal.jsp?appver=sal&subjectCode="+courseCodes[0]+"&courseCode="+courseCodes[1]+"&version=2018090400&sec=0&reload=true"
      document.getElementById('classDetails').src = url;
      console.log(url);
      /*var win = window.open(url, '_blank');
      win.focus();*/
    }
  }
}
</script>
