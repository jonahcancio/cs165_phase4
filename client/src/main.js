import Vue from "vue";
import App from "./App.vue";

import Router from "@/router";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import '@/components/global'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router: Router
}).$mount("#app");
