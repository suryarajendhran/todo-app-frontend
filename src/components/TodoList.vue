<template>
  <b-table :data="todos" :mobile-cards="true" :paginated="true" :per-page="5" :show-header="false">
    <b-table-column field="completed" label="status" centered v-slot="props">
      <b-button
        @click="() => {toggleTodo(props.row.id)}"
        rounded
        size="is-small"
        :icon-left="props.row.completed ? 'check' : ''"
      >
      </b-button>
    </b-table-column>
    <b-table-column field="description" label="Todo content" centered v-slot="props">
      <p :class="{ strikethrough: props.row.completed }">
        {{ props.row.description }}
      </p>
    </b-table-column>

    <b-table-column field="created_at" label="Date" centered v-slot="props">
      <span class="tag is-success">
        {{ new Date(props.row.created_at).toLocaleDateString() }}
      </span>
    </b-table-column>

    <template #empty>
      <div class="has-text-centered">No records</div>
    </template>
  </b-table>
</template>

<script lang="ts">
import api from '@/api';
import Vue from 'vue';
import store from '../store';

export default Vue.extend({
  name: 'TodoList',
  data: () => ({ newTodoDescription: '', isInputLoading: false }),
  methods: {
    deleteTodo() {
      console.log('Deleting method');
    },
    toggleTodo(todoId: any) {
      store.dispatch('toggleTodo', todoId);
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

<style scoped>
.strikethrough {
  text-decoration: line-through;
}
</style>
