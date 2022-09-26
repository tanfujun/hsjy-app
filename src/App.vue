<template>
    <div id="app">

        <!--组件显示-->
        <router-view/>

        <!--底部切换-->
        <van-tabbar route>
            <!--<van-tabbar-item replace to="/home" icon="wap-home-o">首页</van-tabbar-item>-->
            <van-tabbar-item replace to="/news" icon="newspaper-o">红色资讯</van-tabbar-item>
            <van-tabbar-item replace to="/knowledge" icon="description">知识库</van-tabbar-item>
            <van-tabbar-item replace to="/profile" icon="manager-o">我的</van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>
    import {Notify} from 'vant';
    /*进入页面先校验token是否有效，如果有效的话，直接将用户的基本信息放置在仓库里面*/
    export default {
        name: 'app',
        created() {
            this.$store.dispatch('checkLogin');
        },
        methods: {
            onChange(index) {
                Notify({type: 'primary', message: index});
            },
        },
    };
</script>

<style lang="less">
    #app {
        max-width: 750px;
        width: 100%;
        margin: 0 auto;
        min-width: 320px;
    }
</style>
