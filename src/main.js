import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/components/globals";
import "@/assets/fonts/pt_root_ui/pt_root_ui.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
