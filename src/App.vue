<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <b-field label="Name">
        <b-input v-model="name"></b-input>
      </b-field>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from './components/Navbar.vue';

export default Vue.extend({
  name: 'App',
  components: { Navbar },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
