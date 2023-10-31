/*
 * @Description: 接口统一集成模块
 */

// 默认全部导出当前模块的API
import * as $api from "./api";
let apiObj = {
  $api,
};
// 通过挂载方法到VUE原型上
const install = (Vue) => {
  if (install.installed) return;
  install.installed = true;
  Object.defineProperties(Vue.prototype, {
    // 注意，此处挂载在 Vue 原型的 $api 对象上
    $api: {
      get() {
        return apiObj;
      },
    },
  });
};

export default install;
