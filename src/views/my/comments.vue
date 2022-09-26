<template>
    <div class="news">
        <van-sticky>

            <van-nav-bar
                    title="我的评论列表"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </van-sticky>

        <div class="collect-bg">

            <h2>我的评论列表</h2>

        </div>

        <div>
            <CommentItem :data="list" isType="comments" @cancel="cancelItem"></CommentItem>
        </div>

    </div>
</template>

<script>

    import CommentItem from '../../components/CommentItem'
    import {commentsByUid, delCommentsByid} from "../../api/user";

    import {mapState} from 'vuex'

    export default {
        name: 'comments',
        data() {
            return {
                uid: '',
                list: [],
            }
        },

        watch: {
            "$store.state.isLogin"(newval, oldval) {
                if(newval){
                    this.getCommentsByUid();
                }
            },
        },
        computed: {
            ...mapState(['userInfo']),

        },
        mounted() {
            this.getCommentsByUid();
        },

        components: {
            CommentItem,
        },

        methods: {
            async cancelItem(item) {

                this.$dialog.confirm({
                    title: '标题',
                    message: '是否删除，一旦删除，无法找回！！！',
                }).then(async () => {
                        let info = await delCommentsByid(item._id);
                        if (info.data.statusCode == 200) {
                            this.$notify({type: 'success ', message: '删除评论成功', duration: 500});
                            this.getCommentsByUid();

                        } else {
                            this.$notify('系统繁忙！！！');
                        }
                })


            },
            onClickLeft() {
                this.$router.back();

            },

            async getCommentsByUid() {
                let info = await commentsByUid();

                if (info.data.statusCode == 200) {
                    this.list = info.data.data.commentList;

                } else {
                    this.$notify('系统繁忙！！！');
                }
            }

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
