import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { fb } from "./firebase";

import "./assets/app.scss";
import $ from "jquery";
window.$ = window.jQuery = $;

import "bootstrap";

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

Vue.config.productionTip = false;

let app = "";
fb.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});

// let app = null;
// fb.auth().onAuthStateChanged(() => {

//   if (!app) {
//       app = new Vue({
//           el: '#app',
//           router,
//           components: { App },
//           template: '<App/>'
//       })
//   }

// })
