<template>
    <div>
        <van-sticky>

            <van-nav-bar
                    title="试题列表"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </van-sticky>


        <div v-for="ele in data">
            <ul class="news-detail-item" :key="ele._id">
                <li class="left">
                    <h2>试卷名称：{{ ele.title }}</h2>
                    <p>分类：{{ ele.questionType }}</p>
                    <p>单选题：{{ ele.singleCount }}</p>
                    <p>多选题：{{ ele.multipleCount }}</p>
                    <p>判断题：{{ ele.judgementCount }}</p>
                    <p>简答题：{{ ele.answerCount }}</p>
                    <p><i class="fa fa-calendar" aria-hidden="true"></i> {{ formatTime(ele.createTime) }}</p>
                </li>

                <li class="right">
                    <van-button type="primary" @click="exam(ele)">开始作答</van-button>&nbsp;&nbsp;
                </li>

            </ul>
        </div>

        <van-empty description="暂无相关试题！！！" v-if="data.length == 0"/>

    </div>
</template>

<script>
    var moment = require('moment');
    import {getPageList} from "../../api/page";

    import {mapState} from 'vuex'

    export default {
        name: "pagelist",
        data() {
            return {
                type: '常识',
                data: [],
            }
        },
        computed: {
            ...mapState(['userInfo']),
        },
        created() {
            this.type = this.$route.query.type;
            this.getPageList();

        },
        methods: {
            exam(item) {
                if (!this.userInfo._id) {
                    this.$notify({type: 'danger ', message: '请登录后在操作！！！', duration: 1500});
                    return;
                }

                this.$router.push('/page/' + item._id);
            },
            formatTime(val) {
                return moment(val).format('YYYY-MM-DD HH:mm:ss')
            },

            onClickLeft() {
                this.$router.back();

            },
            async getPageList() {
                let info = await getPageList(this.type);
                this.data = info.data.data.questionList;

            }
        }
    }
</script>


<style lang="less">
    .news-detail-item {
        display: flex;
        border-bottom: 1px solid #e4e4e4;
        padding: 0.3rem 0.1rem;
        justify-content: space-between;

        .left {
            padding-left: 0.2rem;
            margin-right: 0.4rem;
            width: 60%;

            > h2 {
                -webkit-box-sizing: border-box;
                font-size: .42rem;
                line-height: 1.2;
                color: #1a1a1a;
                font-weight: normal;

                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 10;
                -webkit-box-orient: vertical;

            }

            > p {
                padding: 0.1rem 0;
                font-size: 0.24rem;
                color: #949494;
            }

        }

        .right {
            width: 40%;
            display: flex;
            justify-content: center;
        }

    }
</style>
