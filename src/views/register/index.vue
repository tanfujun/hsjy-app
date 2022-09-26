<template>
    <div class="register">

        <div class="logo">
            <van-image
                    round
                    width="1rem"
                    height="1rem"
                    src="/imgs/hsjy_logo.png"
            />
        </div>

        <van-form @submit="onSubmit">

            <van-field
                    v-model="username"
                    name="username"
                    label="用户名"
                    placeholder="用户名"
                    autocomplete="off"
                    :rules="[{ required: true, message: '' }]"
            />

            <van-field
                    v-model="email"
                    name="email"
                    label="邮箱"
                    placeholder="邮箱"
                    autocomplete="off"
                    :rules="[
                    { required: true, message: '' },
                    {validator : validatorEmail, message: '邮箱不合法'},
                    {validator : isExistEmail, message: '邮箱已被使用'},
                    ]"
            />


            <van-field
                    v-model="password"
                    name="password"
                    label="密码"
                    autocomplete="new-password"
                    type="password"
                    placeholder="设置新密码"
                    :rules="[{ required: true, message: '' }]"
            />

            <van-field
                    v-model="repassword"
                    name="repassword"
                    label="确认密码"
                    autocomplete="new-password"
                    type="password"
                    placeholder="确认新密码"
                    :rules="[{ required: true, message: '' }]"
            />

            <van-field

                    v-model="code"
                    name="code"
                    center
                    clearable
                    label="验证码"
                    autocomplete="off"
                    placeholder="输入验证码"
                    :rules="[{ required: true, message: '' }]"
            >
                <template #button>
                    <van-button @click="getCode" size="small" type="primary">发送验证码</van-button>
                </template>
            </van-field>

            <div class="subBtns">
                <van-button round block type="danger" native-type="submit">注册</van-button>
                <van-button @click="goLogin" class="no-border" round block type="primary" plain>登录</van-button>
            </div>

        </van-form>
    </div>
</template>

<script>
    import {getCode, register, emailIsValidate} from "../../api/user";

    //validatorEmail
    var validator = require('validator');

    export default {
        name: 'password',

        data() {
            return {
                email: '',
                username: '',
                password: '',
                repassword: '',
                code: '',
            };
        },
        methods: {
            validatorEmail(value) {
                return validator.isEmail(value);
            },
            async isExistEmail(value, rules) {
                console.log(value, rules);
                /*服务器返回200，代表验证通过，用户信息不存在，可以注册*/
                let response = await emailIsValidate(value);
                return response.data.statusCode == 200 ? true : false;

            },
            async getCode(e) {
                if (!this.email) {
                    return;
                }
                e.preventDefault();
                let info = await getCode(this.email);
                if (info.data.statusCode == 200) {
                    this.$notify({type: 'success ', message: '验证码已发送', duration: 1000});
                }else{
                  this.$notify({type: 'danger ', message: info.data.message, duration: 2000});
                }

            },
            async goLogin(e) {
                e.preventDefault();
                this.$router.push('/login');

            },

            async onSubmit(values) {
                let registerInfo = {
                    "name": this.username,
                    "email": this.email,
                    "password": this.password,
                    "password2": this.repassword,
                    "code": this.code,
                }

                let info = await register(registerInfo);
                if (info.data.statusCode == 200) {
                    this.$notify({type: 'success ', message: '注册成功', duration: 1000});
                    this.$router.push('/login');

                } else {
                    this.$notify({type: 'danger ', message: '系统繁忙', duration: 1000});
                }

            },
            onClickLeft() {
                this.$router.back();

            },

        },
    };
</script>

<style lang="less" scoped>
    .register {
        height: 100vh;
        background-color: #fff;

        .logo {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 3rem;
        }

        .subBtns {
            margin: 0.32rem 0;

            .no-border {
                border: none;
                color: #999;
            }

            .van-button {
                margin-bottom: 0.1rem;
            }
        }
    }
</style>
