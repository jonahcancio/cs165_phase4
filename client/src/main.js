import Vue from "vue";
import App from "./App.vue";

import Router from "@/router";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import '@/components/global'
Vue.prototype.$console = window.console;

import axios from 'axios'
Vue.prototype.$axios = axios;

Vue.prototype.$eventBus = new Vue()

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router: Router
}).$mount("#app");
