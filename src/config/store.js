import Vue from 'vue';
import "babel-polyfill";
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        member: null,
        activeNav: '',
        activeMenuName: '',
        lang: ''
    },
    mutations: {
        navigate(state, nav) {
            state.activeNav = nav;
        },
        leftmenu(state, nav) {
            state.activeMenuName = nav;
        },
        setMember(state, member) {
            state.member = member;
            localStorage.setItem('MEMBER', JSON.stringify(member));
        },
        recoveryMember(state) {
            state.member = JSON.parse(localStorage.getItem('MEMBER'));
        },
        setlang(state, lang) {
            state.lang = lang;
            localStorage.setItem('LANGUAGE', JSON.stringify(lang));
        },
        initLang(state) {
            if (localStorage.getItem('LANGUAGE') == null) {
                state.lang = "简体中文";
            } else {
                state.lang = JSON.parse(localStorage.getItem('LANGUAGE'));
            }
        },
        // 倒计时
        start(state,timer){//处理数据的变化
            //处理倒计时
            if(state.count != 0 ){
                state.count--;
            }else {
                clearInterval(timer)
            }       
        }
    },
    getters: {
        member(state) {
            return state.member;
        },
        isLogin(state) {
            return state.member != null;
        },
        lang(state) {
            return state.lang;
        },
        // 倒计时
        count(state){
            return state.count;
        }
    },
    // 倒计时添加
    actions:{
        start:({//处理一些异步请求，判断，流程控制
            commit
        }) => {
            // clearInterval(timer)
            var timer = setInterval(function(){
                commit('start')
            },1000)
        }
    }
});