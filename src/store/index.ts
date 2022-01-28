import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';

Vue.use(Vuex);
export default new Vuex.Store({
  state: () => ({
    todos: [],
  }),
  mutations: {
    updateTodos: (state, todos) => {
      state.todos = todos;
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
      const [todoToBeUpdated]: any = state.todos.filter((todo: any) => todo.id === todoId);
      todoToBeUpdated.completed = !todoToBeUpdated.completed;
      const { updatedTodos } = await api.updateTodo(todoToBeUpdated);
      commit('updateTodos', updatedTodos);
    },
  },
  modules: {
  },
});
