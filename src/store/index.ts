import Todo from '@/interfaces/Todo.interface';
import isMobile from 'is-mobile';
import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';

Vue.use(Vuex);
export default new Vuex.Store({
  state: () => ({
    todos: [],
    filter: 'all',
    isMobile: isMobile(),
    user: null,
  }),
  mutations: {
    updateTodos: (state, todos) => {
      state.todos = todos;
    },
    updateFilter: (state, filter) => {
      state.filter = filter;
    },
    setUser: (state, user) => {
      state.user = user;
    },
  },
  actions: {
    createTodo: async ({ commit }, todoDescription: string) => {
      const { updatedTodos } = await api.createTodo(todoDescription);
      commit('updateTodos', updatedTodos);
    },
    loadTodos: async ({ commit }) => {
      commit('updateTodos', await api.getAllTodos());
    },
    toggleTodo: async ({ commit, state }, todoId: string) => {
      const [todoToBeUpdated]: Todo[] = state.todos.filter((todo: Todo) => todo.id === todoId);
      todoToBeUpdated.completed = !todoToBeUpdated.completed;
      const { updatedTodos } = await api.updateTodo(todoToBeUpdated);
      commit('updateTodos', updatedTodos);
    },
    deleteTodo: async ({ commit }, todo: Todo) => {
      const { updatedTodos } = await api.deleteTodo(todo);
      commit('updateTodos', updatedTodos);
    },
    clearCompletedTodos: async ({ commit }) => {
      const { updatedTodos } = await api.clearCompletedTodos();
      commit('updateTodos', updatedTodos);
    },
  },
  modules: {
  },
});
