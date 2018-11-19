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
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
        >
          <span class="mr-2">Latest Release</span>
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