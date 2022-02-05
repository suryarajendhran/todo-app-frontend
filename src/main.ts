import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';
import store from './store';
import firebase from './services';
import 'buefy/dist/buefy.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';

Vue.use(Buefy);

firebase.initialize();

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
