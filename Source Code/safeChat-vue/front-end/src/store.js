import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const state = {
    token: JSON.parse(localStorage.getItem('token')),
    
};

const mutations = {

    // 将当前登录用户的数据保存在localStorage
    SET_TOKEN(state, data) {
        state.token = data;
        window.sessionStorage.setItem('token', data)
    },
    //获取用户名
    GET_USER: (state, data) => {
        // 把用户名存起来
        state.username = data
        window.sessionStorage.setItem('username', data)
    },
    //登出
    LOGOUT: (state) => {
        // 登出的时候要清除token
        state.token = null
        state.username = null
        window.sessionStorage.removeItem('token')
        window.sessionStorage.removeItem('username')
    }

},

const actions = {
    GET_SLIDELIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getSlideList2').then(response => {
                commit('GET_SLIDELIST', response.data);
                resolve();
            })
        })
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
})
