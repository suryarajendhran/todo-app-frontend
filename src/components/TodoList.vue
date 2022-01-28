<template>
  <b-table
    :data="todos"
    :mobile-cards="false"
    :paginated="todos.length > 9"
    :per-page="isMobile ? 7 : 9"
    :show-header="false"
    default-sort="created_at"
    default-sort-direction="desc"
  >
    <b-table-column field="completed" label="Status" v-slot="props" centered>
      <div class="pretty p-icon p-round p-jelly is-size-4">
        <input
          type="checkbox"
          v-model="props.row.completed"
          @click="
            () => {
              toggleTodo(props.row.id);
            }
          "
        />
        <div class="state p-success-o">
          <i class="icon mdi mdi-check-all"></i>
          <label></label>
        </div>
      </div>
    </b-table-column>
    <b-table-column field="description" label="Todo content" v-slot="props">
      <p :class="{ strikethrough: props.row.completed, 'has-text-left': true }">
        {{ props.row.description }}
      </p>
    </b-table-column>

    <b-table-column field="created_at" label="Date" sortable v-slot="props" numeric>
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
      <div class="has-text-centered">
        Nothing to show here, time to {{ filter === "completed" ? "complete" : "add" }} some tasks
        😇
      </div>
    </template>
  </b-table>
</template>

<script lang="ts">
import Todo from '@/interfaces/Todo.interface';
import Vue from 'vue';
import store from '../store';

export default Vue.extend({
  name: 'TodoList',
  data: () => ({ newTodoDescription: '', isInputLoading: false }),
  methods: {
    deleteTodo(todo: Todo) {
      console.log(todo);
      store.dispatch('deleteTodo', todo);
    },
    toggleTodo(todoId: string) {
      store.dispatch('toggleTodo', todoId);
    },
  },
  computed: {
    todos() {
      switch (store.state.filter) {
        case 'all':
          return store.state.todos;
        case 'active':
          return store.state.todos.filter((todo: Todo) => todo.completed === false);
        case 'completed':
          return store.state.todos.filter((todo: Todo) => todo.completed === true);
        default:
          return store.state.todos;
      }
    },
    isMobile() {
      return store.state.isMobile;
    },
    filter() {
      return store.state.filter;
    },
  },
  created() {
    store.dispatch('loadTodos');
  },
});
</script>

<style>
.strikethrough {
  text-decoration: line-through;
}
td:first-child,
td:last-child {
  width: 40px;
}
</style>
