<template>
  <div id="app">
    <Navbar />
    <div :class="{'container mt-4': true, 'px-2': isMobile}">
      <AddTodoBar />
      <Toolbar />
      <TodoList />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from './components/Navbar.vue';
import store from './store';
import TodoList from './components/TodoList.vue';
import Toolbar from './components/Toolbar.vue';
import AddTodoBar from './components/AddTodoBar.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Navbar, TodoList, Toolbar, AddTodoBar,
  },
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
    isMobile() {
      return store.state.isMobile;
    },
  },
  created() {
    store.dispatch('loadTodos');
  },
});
</script>

<style>
#app, button {
  font-family: Avenir, Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
