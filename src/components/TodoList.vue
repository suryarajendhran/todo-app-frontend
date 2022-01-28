<template>
  <b-table
    :data="todos"
    :mobile-cards="true"
    :paginated="true"
    :per-page="5"
    :show-header="false"
    default-sort="created_at"
    default-sort-direction="desc"
  >
    <b-table-column field="completed" label="Status" centered v-slot="props">
      <b-button
        @click="
          () => {
            toggleTodo(props.row.id);
          }
        "
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

    <b-table-column field="created_at" label="Date" sortable centered v-slot="props">
      <span class="tag is-success">
        {{ new Date(props.row.created_at).toLocaleTimeString() }}
      </span>
    </b-table-column>

    <b-table-column label="Actions" numeric v-slot="props">
      <b-button
        @click="
          () => {
            deleteTodo(props.row);
          }
        "
        rounded
        size="is-small"
        icon-left="delete"
        type="is-danger"
      >
      </b-button>
    </b-table-column>

    <template #empty>
      <div class="has-text-centered">No records</div>
    </template>
  </b-table>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '../store';

export default Vue.extend({
  name: 'TodoList',
  data: () => ({ newTodoDescription: '', isInputLoading: false }),
  methods: {
    deleteTodo(todo: any) {
      console.log(todo);
      store.dispatch('deleteTodo', todo);
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
