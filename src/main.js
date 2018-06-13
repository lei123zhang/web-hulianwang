// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import routes from './config/routes.js';
import "babel-polyfill";
import store from './config/store.js';
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import VueI18n from 'vue-i18n';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import App from './App.vue';
import Api from './config/api';
import $ from '@js/jquery.min.js';

var moment = require('moment');

// 将Promise抛出为全局对象
window.Promise = Promise;

Vue.use(iView);
Vue.use(VueClipboard)
Vue.use(VueRouter);
Vue.use(vueResource);
Vue.use(VueI18n);
// Vue.prototype.host = "http://api.bitrade.wxmarket.cn";
// Vue.prototype.host = "http://paibi.wxmarket.cn";
// Vue.prototype.host = "http://api.cex.wxmarket.cn";
Vue.prototype.host = "http://api.hlt.wxmarket.cn";
Vue.prototype.url = "http://hlt.wxmarket.cn/";
// Vue.prototype.host = "https://api.homiex.com";

// Vue.prototype.host = "https://api.caymanex.pro";
Vue.prototype.api = Api;
Vue.http.options.credentials = true;
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Content-Type': 'application/json;charset=utf-8'
};
const router = new VueRouter({
    mode: 'hash',
    routes
})
const i18n = new VueI18n({
    locale: 'zh', // 语言标识
    messages: {
        'zh': require('./assets/lang/zh.js'),
        'en': require('./assets/lang/en.js')
    }
});
Vue.http.interceptors.push((request, next) => {
    //登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值
    request.headers.set('x-auth-token', localStorage.getItem('TOKEN'));
    next((response) => {
        var token = response.headers.get('x-auth-token');
        if (token != null && token != '') {
            localStorage.setItem('TOKEN', token);
        }
        if (response.body.code == '4000' || response.body.code == '3000') {
            store.commit('setMember', null);
            router.push('/login');
            return false;
        }
        return response;
    });
});

Vue.config.productionTip = false
Vue.filter('timeFormat', function(tick) {
    return moment(tick).format("HH:mm:ss");
});
Vue.filter('dateFormat', function(tick) {
    return moment(tick).format("YYYY-MM-DD HH:mm:ss");
});

Vue.filter('toFixed', function(number, scale) {
    return new Number(number).toFixed(scale);
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    template: '<App/>',
    components: { App }
})