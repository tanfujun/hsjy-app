<template>
    <div class="password">


        <van-nav-bar
                title="设置新密码"
                left-arrow
                @click-left="onClickLeft"
        />

        <van-form @submit="onSubmit">

            <van-field
                    autocomplete="new-password"
                    type="password"
                    v-model="oldPassword"
                    name="oldPassword"
                    placeholder="原始密码"
                    :rules="[{ required: true, message: '' }]"
            />

            <van-field
                    autocomplete="new-password"
                    type="password"
                    v-model="newPassword"
                    name="newPassword"
                    placeholder="设置新密码"
                    :rules="[{ required: true, message: '' }]"
            />

            <van-field
                    autocomplete="new-password"
                    type="password"
                    v-model="surePassword"
                    name="surePassword"
                    placeholder="确认新密码"
                    :rules="[{ required: true, message: '' }]"
            />

            <!-- <van-field
                     v-model="code"
                     name="code"
                     center
                     clearable
                     label="短信验证码"
                     placeholder="输入短信验证码"
                     :rules="[{ required: true, message: '' }]"
             >
                 <template #button>
                     <van-button size="small" type="primary">发送验证码</van-button>
                 </template>
             </van-field>-->

            <div style="margin: 16px;">
                <van-button round block type="danger" native-type="submit">确认修改</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import {changePwd} from "../../api/user";
    import {mapState} from 'vuex'

    export default {
        name: 'password',

        data() {
            return {
                oldPassword: '',
                newPassword: '',
                surePassword: '',
                code: '',
            };
        },

        computed: {
            ...mapState(['userInfo']),

        },


        methods: {
            async onSubmit(values) {
                let info = await changePwd(values);

                if (info.data.statusCode == 200) {
                    this.$notify({type: 'success ', message: '修改成功', duration: 1000});
                    this.$router.back();
                } else {
                    this.$notify('系统繁忙！');
                }

            },
            onClickLeft() {
                this.$router.back();

            },

        },
    };
</script>

<style lang="less" scoped>
    .password {
        /*padding-top: 2rem;*/
        background-color: #fff;
    }
</style>
