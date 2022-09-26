<template>
    <div class="news">

        <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
            <van-swipe-item v-for="ele in banners">
                <van-image
                        width="100%"
                        :src="ele.imgurl"
                />

            </van-swipe-item>

        </van-swipe>

        <van-tabs @click="selectedCategory">
            <van-tab :title="ele.title" v-for="ele in cateList">
                <NewsItem :data="list"></NewsItem>
            </van-tab>

        </van-tabs>

    </div>
</template>

<script>

    import NewsItem from '../../components/NewsItem'
    import {getNews, getCategory} from "../../api/news";

    export default {
        name: 'movies',
        data() {
            return {
                list: [],
                cateList: [],
                cate_id: '最新时讯',
                banners: [
                    {
                        id: 1,
                        imgurl: '/banners/b1.jpg',
                    },
                    {
                        id: 2,
                        imgurl: '/banners/b2.jpg',
                    },
                    {
                        id: 1,
                        imgurl: '/banners/b1.jpg',
                    },
                    {
                        id: 2,
                        imgurl: '/banners/b2.jpg',
                    },
                    {
                        id: 2,
                        imgurl: '/banners/b2.jpg',
                    },
                    {
                        id: 1,
                        imgurl: '/banners/b1.jpg',
                    },


                ],
                swiperOptions: {
                    pagination: {
                        el: '.swiper-pagination'
                    },
                }
            }
        },

        mounted() {
            this.getCateList();


        },

        components: {
            NewsItem,
        },

        methods: {
            async getNewsList({cate_id}) {
                let info = await getNews({cate_id});
                let {statusCode} = info.data;

                if (statusCode == 200) {
                    this.list = info.data.data.list;
                } else {

                    alert('系统繁忙');
                }


            },

            async getCateList() {
                let info = await getCategory();
                let {statusCode} = info.data;
                if (statusCode == 200) {
                    this.cateList = info.data.data.list;
                    this.cate_id = info.data.data.list[0].title;
                    this.getNewsList({cate_id: this.cate_id});

                } else {

                    alert('系统繁忙');
                }


            },

            selectedCategory(index, title) {
                this.getNewsList({cate_id: title});
            },

        }
    }

</script>

<style scoped lang="less">
    .news {
        margin-bottom: 1.5rem;
    }

</style>
