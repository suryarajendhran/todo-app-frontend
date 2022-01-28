import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
  },
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
  },
  modules: {
  },
});
