<template>
  <b-field>
    <b-input
      v-model="newTodoDescription"
      :loading="isInputLoading"
      placeholder="Add your todo here!"
      @keyup.native.enter="handleNewTodo"
    ></b-input>
  </b-field>
</template>

<script lang="ts">
import store from '@/store';
import Vue from 'vue';

export default Vue.extend({
  name: 'AddTodoBar',
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
