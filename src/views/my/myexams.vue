<template>
    <div class="news">
        <van-sticky>
            <van-nav-bar
                    title="我的试卷列表"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </van-sticky>

        <div class="collect-bg">

            <h2>我的试卷</h2>

        </div>

        <div v-for="ele in list">
            <ul class="news-detail-item" :key="ele._id">
                <li class="left">
                    <h2>试卷名称：{{ ele.title }}</h2>
                    <p>答对题数：{{ele.correctCount}}</p>
                    <p>总题目数：{{ele.totalCount}}</p>
                    <p>答对率：{{ (ele.correctPercent *100).toFixed(2) + '%' }}</p>
                    <p><i class="fa fa-calendar" aria-hidden="true"></i> {{ formatTime(ele.createTime) }}</p>
                </li>

                <li class="right">

                    <van-button type="primary"  @click="showDetail(ele)">查看详情</van-button>&nbsp;&nbsp;

                </li>

            </ul>
        </div>

        <van-empty description="暂无相关信息！！！" v-if="list.length == 0"/>
    </div>
</template>

<script>
    var moment = require('moment');
    import NewsItem from '../../components/NewsItem'
    import {personPageByUid} from "../../api/page";
    import {mapState} from  'vuex'

    export default {
        name: 'exams',
        data() {
            return {
                uid: '',
                list: [],
            }
        },

        watch: {
            "$store.state.isLogin"(newval, oldval) {
                if(newval){
                    this.getMyPagesByUid();
                }
            },
        },

        computed:{
          ...mapState(['userInfo']),
        },
        mounted() {
            this.getMyPagesByUid();
        },

        components: {
            NewsItem,
        },

        methods: {
            showDetail(item){
                this.$router.push('/show/examinfo/' + item.answerId);
            },
            formatTime(val) {
                return moment(val).format('YYYY-MM-DD HH:mm:ss')
            },
            onClickLeft() {
                this.$router.back();

            },

            async getMyPagesByUid() {

                let info = await personPageByUid(this.userInfo._id);

                let {statusCode} = info.data;

                if (statusCode == 200) {
                    this.list = info.data.data.answerList;

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
        background: #EECDA3;
        background: -webkit-linear-gradient(to left, #EF629F, #EECDA3);
        background: linear-gradient(to left, #EF629F, #EECDA3);

        > h2 {
            font-size: 28px;
            color: #fff;
            line-height: 1.5rem;
            padding-left: 0.2rem;
        }
    }

</style>
