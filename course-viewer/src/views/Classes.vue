<template>
  <v-container text-xs-center>
    <v-layout column>
      <header>
        <h1>Enrolled Classes</h1>
        <br>
      </header>

      <v-dialog
        v-model="modal"
        width="90%"
        :scrollable="true">

        <v-card :height="findHeight">
          <v-responsive height="100%" v-html="url"></v-responsive>
        </v-card>
      </v-dialog>

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

    </v-layout>
  </v-container>
</template>

<script>
import courses from '../assets/data/classes.json'
import {requestData, ViewCourseInfo} from '../assets/js/GetData.js'
import StudentService from '@/services/StudentService.js'
export default {
  data(){
    return{
      courses: [],
      modal:false,
      url:""
    }
  },
  async created(){
    await StudentService.fetchPrograms().then(response => {
      this.courses = response.data.courses
    })
  },
  methods: 
  {
    viewDetails(code)
    {
      var str = code;
      str = code.substring(0, str.length - 4);
      var url = ViewCourseInfo(str);
      //var courseCodes = code.split(" ", 2)
      //var str = courseCodes[1]
      //str = str.substring(0, str.length - 4);
      //courseCodes[1] = str
      //var url = "https://ulysses.sheridanc.on.ca/coutline/coutlineview_sal.jsp?appver=sal&subjectCode="+courseCodes[0]+"&courseCode="+courseCodes[1]
      //document.getElementById('classDetails').src = url;
      this.url = `<object data="${url}" style="width:100%; height:100%"></object>`;
      this.modal = true;
      console.log(url);
      /*var win = window.open(url, '_blank');
      win.focus();*/
    }
  },
  computed: {
    findHeight() {
      let height = window.innerHeight * 0.9
      console.log(height)
      return height
    }
  }
}
</script>
