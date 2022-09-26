<template>
    <div class="news">
        <van-sticky>

            <van-nav-bar
                    title="我的收藏列表"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </van-sticky>

        <div class="collect-bg">

            <h2>我的收藏</h2>

        </div>

        <div>
            <NewsItem :data="list" isType="collect" @cancel="cancelItem"></NewsItem>
        </div>

    </div>
</template>

<script>

    import NewsItem from '../../components/NewsItem'
    import {collectNewsList, cancelCollect} from "../../api/news";

    import {mapState} from 'vuex'

    export default {
        name: 'collects',
        data() {
            return {
                uid: '',
                list: [],
            }
        },
        watch: {
            "$store.state.isLogin"(newval, oldval) {
                if (newval) {
                    this.collectNewsList();
                }
            },
        },

        computed: {
            ...mapState(['userInfo']),

        },
        mounted() {
            this.collectNewsList();
        },

        components: {
            NewsItem,
        },

        methods: {
            /*取消收藏*/
            async cancelItem(item) {

                this.$dialog.confirm({
                    title: '标题',
                    message: '是否移除，一旦移除，无法找回！！！',
                }).then(async () => {
                    let info = await cancelCollect(item._id, this.userInfo._id);

                    if (info.data.statusCode == 200) {
                        this.$notify({type: 'success ', message: '收藏已移除', duration: 500});
                        this.collectNewsList();
                    } else {
                        this.$notify({type: 'danger ', message: '系统繁忙', duration: 500});

                    }

                    if (info.data.statusCode == 200) {
                        this.$notify({type: 'success ', message: '删除评论成功', duration: 500});
                        this.getCommentsByUid();

                    } else {
                        this.$notify('系统繁忙！！！');
                    }
                }).catch(() => {
                })


            },
            onClickLeft() {
                this.$router.back();

            },
            /*收藏列表*/
            async collectNewsList() {

                let info = await collectNewsList(this.userInfo._id);
                let {statusCode} = info.data;


                if (statusCode == 200) {
                    this.list = info.data.data.collectInfo;

                } else {

                    this.$notify('系统繁忙');
                }


            },

        }
    }

</script>

<style scoped lang="less">
    .news {
        margin-bottom: 1.5rem;
    }

    .collect-bg {
        width: 100%;
        height: 1.5rem;


        background: #654ea3;
        background: -webkit-linear-gradient(to right, #eaafc8, #654ea3);
        background: linear-gradient(to right, #eaafc8, #654ea3);

        > h2 {
            font-size: 28px;
            color: #fff;
            line-height: 1.5rem;
            padding-left: 0.2rem;
        }
    }

</style>
