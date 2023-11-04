import axios from "axios";
import { MessageBox, Message } from "element-ui";

//  错误码白名单
const errorCodeWhitelists = [];

// 设置基本请求地址
axios.defaults.baseURL = "https://new.dcyijian.com";

axios.defaults.headers["Content-Type"] = "application/json";
// 设置请求超时时间
axios.defaults.timeout = 100000;
// 请求拦截函数
axios.interceptors.request.use(
  (config) => {
    config.url = config.url
      ? decodeURI(encodeURI(config.url).replace(/%E2%80%8B/g, ""))
      : "";
    config.headers.Authorization = "";
    config.headers.tokenTypeHint = "access_token";
    if (sessionStorage.getItem("accessToken")) {
      config.headers.access_token = `${sessionStorage.getItem("accessToken")}`;
      config.headers.token = `${sessionStorage.getItem("accessToken")}`;
    }
    // if (sessionStorage.getItem("jwtToken")) {
    //   config.headers.jwt_token = `${sessionStorage.getItem("jwtToken")}`;
    // }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// 响应拦截函数
axios.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (error) => {
    if (error.response) {
      return errorHandle(
        error.response.status,
        error.response.data.message || error.response.data.msg,
        error.response
      );
    } else {
      // alert('你已断开网络,请刷新页面')
    }
  }
);

export default (url, data = {}, type = "GET") => {
  type = type.toUpperCase();
  if (type == "GET") {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: data,
        })
        .then((response) => {
          resolve(response && response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  if (type == "POST") {
    return new Promise((resolve, reject) => {
      axios.post(url, data).then(
        (response) => {
          resolve(response && response.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  if (type == "PUT") {
    return new Promise((resolve, reject) => {
      axios.put(url, data).then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  if (type == "DELETE") {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, {
          params: data,
        })
        .then(
          (response) => {
            resolve(response);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  if (type == "PATCH") {
    return new Promise((resolve, reject) => {
      axios.patch(url, data).then(
        (response) => {
          resolve(response && response.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  if (type == "MYPOST") {
    return new Promise((resolve, reject) => {
      axios.post(url, data).then(
        (response) => {
          if (response && response.data.code === "200") {
            Message({
              message: response.data.message,
              type: "success",
            });
          } else if (response && response.data.code !== "200") {
            Message({
              message: response.data.message,
              type: "error",
            });
          }
          resolve(response && response.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
};

// 错误处理函数
const errorHandle = (status, errorMes, errorObj) => {
  switch (status) {
    case 404:
      MessageBox({
        type: "warning",
        title: "提示",
        message: "请求资源不存在",
      });
      break;
    default:
      if (~errorCodeWhitelists.indexOf(errorObj.data.code))
        return Promise.resolve(errorObj);
      Message({
        type: "error",
        title: "提示",
        message: errorMes,
        duration: 3000,
      });

      break;
  }
  return Promise.reject(errorObj);
};
