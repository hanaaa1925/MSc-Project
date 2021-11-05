import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import md5 from './plugin/md5'
import E from 'wangeditor'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);



Vue.prototype.axios = axios;

Vue.use(md5)

import '@/assets/css/font-awesome.css'
import '@/assets/css/reset.css'
import '@/assets/css/global.css'

import $ from 'jquery'

Vue.config.productionTip = false;


new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#app');
