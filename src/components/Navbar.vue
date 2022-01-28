<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item>
        <div class="title">Nameless todo app</div>
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div>{{ time }}</div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Navbar',
  data: () => ({ time: `${new Date().getHours()} : ${new Date().getMinutes()}` }),
  computed: {
    timeNow() {
      return Date.now();
    },
  },
  mounted() {
    setInterval(() => {
      this.time = `${new Date().getHours()} : ${new Date().getMinutes()}`;
    }, 500);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
