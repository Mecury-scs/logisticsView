"use strict";

import Vue from 'vue';
import axios from "axios";
import {Message} from "element-ui";
import router from "@/router";

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || 'http://localhost:8088';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        var token = sessionStorage.getItem("token");
        if (token){
            config.headers.token = token;
        }
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        if (response.data.code == "20000"){
            Message.error(response.data.desc);
            router.push("/");
        }else{
            if(response.data.code != "10000"){
                Message.error(response.data.desc);
            }
        }
        return response;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

Plugin.install = function(Vue, options) {
  console.log(options)
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
