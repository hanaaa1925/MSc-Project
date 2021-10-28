<template>
    <div class="content-wrapper">
        <div class="login-wrapper">
            <div class="login-top">
                <span>REGISTER</span>
            </div>
            <div class="form-content-wrapper login-content-wrapper">
                <form class="login-form" ref="registerForm">
                    <div class="reg-first-wrapper">
                        <label>
                            <input type="text" placeholder="Real name" v-model="registerForm.realname" autocomplete="off">
                            <span class="input-msg">{{rnameMsg}}</span>
                        </label>
                        <label>
                            <input type="text" placeholder="Username" v-model="registerForm.username" autocomplete="off">
                            <span class="input-msg">{{unameMsg}}</span>
                        </label>
                        <label>
                            <input type="password" placeholder="Password" v-model="registerForm.password"
                                   autocomplete="off">
                            <span class="input-msg">{{pwdMsg}}</span>
                        </label>
                        <label>
                            <input type="text" placeholder="E-mail" v-model="registerForm.email" autocomplete="off">
                            <span class="input-msg">{{emailMsg}}</span>
                        </label>
                        <label>
                            <input type="text" placeholder="Company" v-model="registerForm.company" autocomplete="off">
                            <span class="input-msg">{{companyMsg}}</span>
                        </label>
                        <label>
                            <input type="text" placeholder="Department" v-model="registerForm.department" autocomplete="off">
                            <span class="input-msg">{{departMsg}}</span>
                        </label>
                        <div class="login-btn">
                            <div class="btn-form" @click="regSubmit">SUBMIT</div>
                        </div>
                    </div>
                </form>
                <div class="login-goto">Already registed?
                    <router-link to="/">LOGIN</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RegisterForm',
        data() {
            return {
                regFirstShow: true,
                regNextShow: false,
                registerForm: {
                    realname:'',
                    username: '',
                    password: '',
                    email: '',
                    company: '',
                    department: ''
                },
                rnameMsg: '',
                unameMsg: '',
                pwdMsg: '',
                emailMsg: '',
                companyMsg: '',
                departMsg: ''
            }
        },

        methods: {
            // 点击下一步
            regSubmit() {
                // 邮箱、密码有效性验证
                let regEmail = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z]{2,5}$/;
                if (this.registerForm.email === '') {
                    this.emailMsg = '请输入邮箱';
                    this.pwdMsg = '';
                } else if (!regEmail.test(this.registerForm.email)) {
                    this.emailMsg = '邮箱格式不正确';
                    this.pwdMsg = '';
                } else if (this.registerForm.password === '') {
                    this.emailMsg = '';
                    this.pwdMsg = '请输入密码';
                } else if (this.registerForm.password.length < 6) {
                    this.emailMsg = '';
                    this.pwdMsg = '密码长度至少为6位';
                } else {
                    this.emailMsg = '';
                    this.pwdMsg = '';
                    // 验证邮箱是否已被注册
                    let _this = this;
                    this.axios.post("/api/getUserEmail", {
                        email: _this.registerForm.email,
                    }).then((response) => {
                        if (response.data.length) {
                            _this.emailMsg = '该邮箱已被注册';
                        } else {
                            // 将注册信息写入用户表
                            this.axios.post("/api/register", {
                                realname: _this.registerForm.realname,
                                username: _this.registerForm.username,
                                password: this.$md5(_this.registerForm.password),
                                email: _this.registerForm.email,
                                company: _this.registerForm.company,
                                department: _this.registerForm.department   
                            }).then((response) => {
                                if (response && response.data) {
                                    // 跳转至登录页
                                    _this.$router.push('/');
                                } else {
                                    console.log('error');
                                }
                            });
                        }
                    });
                }
            }
        }
    }




</script>
