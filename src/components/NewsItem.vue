<template>
    <div>
        <div v-for="ele in data">
            <ul class="news-detail-item" :key="ele._id"  @click="showDetail(ele)">
                <li class="left">
                    <h2>{{ ele.title }}</h2>
                    <p>
                        <van-icon name="eye-o"/>
                        {{ ele.viewCount}} 阅读
                    </p>
                    <p><i class="fa fa-calendar" aria-hidden="true"></i> {{ formatTime(ele.createTime) }}</p>
                </li>
                <li class="right" v-if="isType != 'collect'">
                    <img :src="img_prefix_url + ele.imageUrl" alt="">
                </li>
                <li class="right" v-else>
                    <van-button type="primary" @click="showDetail1(ele)">详情</van-button>&nbsp;&nbsp;
                    &nbsp;&nbsp;
                    <van-button type="danger" @click="removeItem(ele)">移除</van-button>
                </li>

            </ul>
        </div>

        <van-empty description="暂无相关信息！！！" v-if="data.length == 0"/>

    </div>
</template>

<script>
    var moment = require('moment');

    import {img_prefix_url} from '../config/site';

    export default {

        name: 'item',
        props: ['data', 'isType'],
        data: function () {
            return {
                img_prefix_url,
            }
        },

        methods: {
            showDetail(item) {
                if (this.isType == 'collect') {
                    return;
                }
                this.$router.push('/detail/' + item._id);
            },
            showDetail1(item) {
                this.$router.push('/detail/' + item._id);
            },
            removeItem(item) {

                this.$emit('cancel', item);

            },
            formatTime(val) {
                return moment(val).format('YYYY-MM-DD HH:mm:ss')
            }
        }
    }
</script>


<style lang="less">
    .news-detail-item {
        display: flex;
        border-bottom: 1px solid #e4e4e4;
        padding: 0.3rem;
        justify-content: space-between;

        .left {
            margin-right: 0.6rem;

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
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;

            }

            > p {
                padding: 0.1rem 0;
                font-size: 0.24rem;
                color: #949494;
            }

        }

        .right {
            >.van-button{
                &:first-child{
                    margin-right: 0.1rem;
                }
            }
            img {
                width: 2rem;
                height: auto;
            }

        }
    }
</style>
