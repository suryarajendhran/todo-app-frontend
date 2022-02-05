<template>
  <div class="container my-3">
    <b-navbar>
      <template #brand>
        <b-navbar-item>
          <div class="title">Nameless TODO app</div>
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div>{{ time }}</div>
        </b-navbar-item>
        <b-navbar-item tag="div">
          <b-button @click="openLogin" v-if="user === null" icon-left="google">
            Login
          </b-button>
          <b-button @click="logOut" v-else>
            Log Out
          </b-button>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import Vue from 'vue';
import firebase from '../services';

export default Vue.extend({
  name: 'Navbar',
  data: () => ({ time: `${new Date().getHours()} : ${new Date().getMinutes()}` }),
  computed: {
    timeNow() {
      return Date.now();
    },
    user() {
      return store.state.user;
    },
  },
  methods: {
    openLogin() {
      firebase.triggerPopUp();
    },
    logOut() {
      firebase.logOut();
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
.navbar-item {
  display: flex;
  justify-content: center;
}
</style>
