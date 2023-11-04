import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "@/utils/rem";
import "./assets/icons/index.js";
import SvgIcon from "@/components/SvgIcon.vue";
// 将自动注册所有组件为全局组件
import dataV from "@jiaminghi/data-view";
import scroll from "vue-seamless-scroll";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
/* http请求 */
import api from "@/http";

console.log(process.env.NODE_ENV === "production" ? "https://new.dcyijian.com" : "./")
Vue.use(api);
Vue.use(ElementUI);
Vue.use(dataV);
Vue.use(scroll);
Vue.use(scroll, { componentName: "scroll-seamless" });
Vue.component("SvgIcon", SvgIcon);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
