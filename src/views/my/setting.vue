<template>
    <div class="setting">
        <van-nav-bar
                title="个人信息"
                left-arrow
                @click-left="onClickLeft"
        />

        <van-divider/>

        <van-cell title="头像" center isLink>
            <template #title>
                <div class="avatar">
                    头像
                    <van-image
                            round
                            width="0.9rem"
                            height="0.9rem"
                            :src="img_prefix_url + userInfo.imageUrl"
                    />
                </div>
            </template>
            <template #right-icon>
                <van-uploader :after-read="afterRead"/>

                <van-icon name="arrow"/>
            </template>
        </van-cell>

        <van-cell title="名称" :value="userInfo.name"/>
        <van-cell title="邮箱" :value="userInfo.email"/>

        <van-divider/>

        <van-cell title="修改密码" @click="changePassword" isLink/>
    </div>
</template>

<script>
    import {updateAvatar, uploadAvatar} from "../../api/user";
    import {img_prefix_url} from '../../config/site';


    import {mapState} from 'vuex'

    export default {
        name: "index",
        data() {
            return {
                img_prefix_url,
                uid: '',
                imageUrl: '',
            }
        },
        computed: {
            ...mapState(['userInfo']),
        },
        methods: {
            setting() {
                console.log('setting');
            },
            onClickLeft() {
                this.$router.back();

            },
            changePassword() {
                this.$router.push('/password');
            },
            async afterRead(file) {
                var data = new FormData();
                data.append("cover", file.file);
                let uploadInfo = await uploadAvatar(data);

                if (uploadInfo.data.statusCode == 200) {

                    let info = await updateAvatar({_id: this.userInfo._id, imageUrl: uploadInfo.data.data.url});
                    console.log(info.data.data.userInfo);
                    this.imageUrl = info.data.data.userInfo.imageUrl;

                    if (uploadInfo.data.statusCode == 200) {
                        this.$notify({type: 'success ', message: '修改头像成功', duration: 500});
                        this.$store.commit('updateUserInfo', info.data.data.userInfo);

                    } else {
                        this.$notify('系统繁忙！');
                    }

                } else {
                    this.$notify('系统繁忙！');
                }

            }
        }
    }
</script>

<style lang="less" scoped>
    .setting {

        .avatar {
            display: flex;
            align-items: center;

            .van-image {
                margin-left: 0.15rem;
            }


        }
    }
</style>
