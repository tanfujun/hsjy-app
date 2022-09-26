import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import {checkLogin} from "../api/user";

const store = new Vuex.Store({
    strict: true,
    state: {
        isLogin: false,
        userInfo: {},
    },
    /*定义同步操作，不需要和后端进行交互*/
    mutations: {
        updateUserInfo(state, payload) {
            state.userInfo = payload;
            state.isLogin = true;
        },
        logout(state) {
            state.userInfo = {};
            state.isLogin = false;
        }
    },
    /*定义异步操作数据的操作，需要和后端进行交互*/
    actions: {
        async checkLogin(store) {
            let info = await checkLogin();
            if (info.data.statusCode == 200) {
                localStorage.setItem('token', info.data.data.token);
                store.commit('updateUserInfo', info.data.data.userInfo);

            } else if(info.data.statusCode == 401) {
                /*token失效*/
                // Vue.prototype.$notify({type:'danger', message:'请登录后在操作！'});
                localStorage.removeItem('token');
                store.commit('logout');
            }
        }
    },
    getters: {}
})

export default store
