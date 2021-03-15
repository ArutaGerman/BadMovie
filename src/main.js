import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import '../node_modules/normalize.css/normalize.css'
import "core-js/stable";
import "regenerator-runtime/runtime";
import Promise from 'promise-polyfill';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

new Vue({
  Promise: Promise,
  vuetify: vuetify,
  render: h => h(App),
}).$mount('#app')