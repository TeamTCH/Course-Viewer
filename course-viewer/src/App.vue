<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/" class="homeLink">Course Viewer</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          flat
          href="/programs"
        >
          <span class="mr-2">Programs</span>
        </v-btn>

        <v-btn
          flat
          href="/classes"
        >
          <span class="mr-2">Current Classes</span>
        </v-btn>

        <v-btn
          flat
          href="/administrator"
        >
          <span class="mr-2">Administrator</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>

<style>
  .homeLink {
    color: black;
    text-decoration: none;
  }
</style>