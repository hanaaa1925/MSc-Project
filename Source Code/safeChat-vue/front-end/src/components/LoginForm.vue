<template>
    <div class="content-wrapper">
        <div class="login-wrapper">
            <div class="login-top">
                <span>LOGIN</span>
            </div>
            <div class="form-content-wrapper login-content-wrapper">
                <form class="login-form" ref="loginForm">
                    <label>
                        <input type="text" placeholder="Username" v-model="loginForm.username" autocomplete="off">
                        <span class="input-msg">{{unameMsg}}</span>
                    </label>
                    <label>
                        <input type="password" placeholder="Password" v-model="loginForm.password" autocomplete="off">
                        <span class="input-msg">{{pwdMsg}}</span>
                    </label>
                    <div class="login-btn">
                        <router-link to="/findpwd" class="forget-pwd">Forget your password?</router-link>
                        <div class="btn-form btn-login-submit" @click="loginSubmit">LOGIN</div>
                    </div>
                </form>
                <div class="login-goto">No Account?
                    <router-link to="/register">REGISTER</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LoginForm',
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                unameMsg: '',
                pwdMsg: ''
            }
        },

        methods: {
            // 点击登录
            loginSubmit() {
                let regEmail = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z]{2,5}$/;
                if (this.loginForm.username === '') {
                    this.unameMsg = '请输入username';
                    this.pwdMsg = '';
                } else if (this.loginForm.password === '') {
                    this.unameMsg = '';
                    this.pwdMsg = '请输入密码';
                } else {
                    this.unameMsg = '';
                    this.pwdMsg = '';
                    let _this = this;
                    this.axios.post("/api/login", {
                        username: _this.loginForm.username,
                        password: this.$md5(_this.loginForm.password),
                    }).then((response) => {
                        if (response.data.length) {
                            // 把当前登录用户数据存入state
                            _this.$store.commit('SET_TOKEN', response.data[0]);
                            $(".menu li a").removeClass("current");
                            $(".animenu ul li a").removeClass("current");
                            _this.$router.push('/Home');
                        } else {
                            _this.unameMsg = '帐号或密码错误';
                            _this.pwdMsg = '帐号或密码错误';
                        }
                    });
                }
            }
        },
    }

</script>
