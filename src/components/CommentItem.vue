<template>
    <div>
        <div v-for="ele in data">
            <ul class="news-detail-item" :key="ele._id">
                <li class="left">
                    <h2>评论文章：{{ele.title}}</h2>

                    <p>评论时间：{{ formatTime(ele.createTime )}}</p>
                    <p>评论内容：{{ele.content}}</p>
                </li>

                <li class="right">
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
        /*display: flex;*/
        border-bottom: 1px solid #e4e4e4;
        padding: 0.3rem;
        /*justify-content: space-between;*/

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

            img {
                width: 2rem;
            }

        }
    }
</style>
