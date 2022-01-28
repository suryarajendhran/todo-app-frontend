<template>
  <div id="app">
    <Navbar />
    <div class="container mt-4">
      <b-field>
        <b-input
          v-model="newTodoDescription"
          :loading="isInputLoading"
          placeholder="Add your todo here"
          @keyup.native.enter="handleNewTodo"
        ></b-input>
      </b-field>
      <TodoList />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from './components/Navbar.vue';
import store from './store';
import TodoList from './components/TodoList.vue';

export default Vue.extend({
  name: 'App',
  components: { Navbar, TodoList },
  data: () => ({ newTodoDescription: '', isInputLoading: false }),
  methods: {
    async handleNewTodo() {
      console.log(this.newTodoDescription);
      this.isInputLoading = true;
      await store.dispatch('createTodo', this.newTodoDescription);
      this.isInputLoading = false;
      this.newTodoDescription = '';
    },
  },
  computed: {
    todos() {
      return store.state.todos;
    },
  },
  created() {
    store.dispatch('loadTodos');
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
