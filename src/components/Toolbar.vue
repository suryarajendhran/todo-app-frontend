<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <b-field class="mb-0 has-addons-centered">
          <b-radio-button v-model="filter" native-value="all" type="is-info is-light is-outlined">
            <span>All</span>
          </b-radio-button>
          <b-radio-button
            v-model="filter"
            native-value="active"
            type="is-warning is-light is-outlined"
          >
            <span>Active</span>
          </b-radio-button>
          <b-radio-button
            v-model="filter"
            native-value="completed"
            type="is-success is-light is-outlined"
          >
            <span>Completed</span>
          </b-radio-button>
        </b-field>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <div>
          <b-button label="Clear completed" type="is-danger is-light" icon-left="delete"></b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import Vue from 'vue';

export default Vue.extend({
  name: 'Toolbar',
  data: () => ({ filter: 'all' }),
  watch: {
    filter() {
      store.commit('updateFilter', this.filter);
    },
  },
});
</script>
