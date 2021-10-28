import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载
const Layout = () => import('./views/Layout');
const Home = () => import('./views/Home');
const Register = () => import('./views/Register');
const Login = () => import('./views/Login');

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkExactActiveClass: 'current',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },{
            path: '/Register',
            name: 'Register',
            component: Register
        },{
            path: '/Layout',
            name: 'Layout',
            component: Layout
        },
        {
            path: '/Home',
            name: 'Home',
            component: Home
        },
    ]
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        localStorage.removeItem('token');
    }
    const token = localStorage.getItem('token');

    if (!token && to.matched.some(function (item) {
        return item.meta.login_required;
    })) {
        next('/login');
    } else {
        next();
    }

});

export default router;
