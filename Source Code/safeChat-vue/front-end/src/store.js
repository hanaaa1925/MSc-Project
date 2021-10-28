import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const state = {
    token: JSON.parse(localStorage.getItem('token')),
    
};

const mutations = {

    // 将当前登录用户的数据保存在localStorage
    SET_TOKEN(state, token) {
        localStorage.setItem('token', JSON.stringify(token));
        state.token = token;
    },

};

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
