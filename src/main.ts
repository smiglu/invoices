import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import i18n from './i18n';

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
