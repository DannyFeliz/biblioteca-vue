import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from "axios";
import _ from "underscore";
import moment from "moment";
import { env } from "./ENV"

moment.locale("es");
window.API = env.API;
window.axios = axios;
window._ = _;
window.moment = moment;
import { routes } from "./routes"
Vue.use(VueRouter);

export const router = new VueRouter({
    routes,
    linkActiveClass: "active"
});
export var hide = false;
router.afterEach((to, from) => {
    console.log(to);
    // if (to.path !== "/login" || to.path !== "/register" && !localStorage.getItem("user")) {
        // $.notify({
        //     icon: 'pe-7s-close-circle',
        //     message: "Debes iniciar sesión para estar aquí"
        // }, {
        //     type: 'danger',
        //     timer: 4000
        // });
        // router.replace("/login");
        // return;
    // }
    // document.querySelectorAll("li.active").forEach(function(node) {
    //     node.classList.remove("active");
    // });
    //
    // document.querySelectorAll("li > a.active").forEach((node) => {
    //   node.parentElement.classList.add("active");
    // });
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
