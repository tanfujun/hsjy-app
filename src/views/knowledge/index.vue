<template>
    <!--https://uigradients.com/-->
    <div class="page">
        <div class="list">
            <div class="item" v-for="ele in types" @click="showPages( ele.name)">{{ ele.name }}</div>
        </div>
    </div>
</template>

<script>
    import {getPageTypes} from "../../api/page";

    export default {
        name: "index",
        data() {
            return {
                types: [],
            }
        },
        created() {
            this.getPageTypes();
        },
        methods: {

            async getPageTypes() {
                let info = await getPageTypes();
                this.types = info.data.data.result;


            },
            showPages(type) {
                this.$router.push('/page/list?type=' + type);
            }
        }
    }
</script>

<style scoped lang="less">
    .page {
        height: 100vh;
        background-color: #fff;
        padding: 0.3rem;

        .list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .item {
                width: 48%;
                height: 1.5rem;
                margin-bottom: 0.2rem;
                border-radius: 0.1rem;
                padding-left: 0.1rem;
                padding: 0.2rem;
                font-size: 0.36rem;
                font-weight: 600;
                color: #fff;

                &:nth-child(1) {
                    background: #2193b0;
                    background: -webkit-linear-gradient(to left, #6dd5ed, #2193b0);
                    background: linear-gradient(to left, #6dd5ed, #2193b0);
                }

                &:nth-child(2) {
                    background: #11998e;
                    background: -webkit-linear-gradient(to left, #38ef7d, #11998e);
                    background: linear-gradient(to left, #38ef7d, #11998e);

                }

                &:nth-child(3) {
                    background: #fc4a1a;
                    background: -webkit-linear-gradient(to left, #f7b733, #fc4a1a);
                    background: linear-gradient(to left, #f7b733, #fc4a1a);

                }

                &:nth-child(4) {
                    background: #74ebd5;
                    background: -webkit-linear-gradient(to left, #ACB6E5, #74ebd5);
                    background: linear-gradient(to left, #ACB6E5, #74ebd5);


                }

                &:nth-child(5) {
                    background: #6190E8;
                    background: -webkit-linear-gradient(to left, #A7BFE8, #6190E8);
                    background: linear-gradient(to left, #A7BFE8, #6190E8);
                }

                &:nth-child(6) {
                    background: #EECDA3;
                    background: -webkit-linear-gradient(to left, #EF629F, #EECDA3);
                    background: linear-gradient(to left, #EF629F, #EECDA3);
                }

                &:nth-child(n+7) {
                    background: #EECDA3;
                    background: -webkit-linear-gradient(to left, #EF629F, #EECDA3);
                    background: linear-gradient(to left, #EF629F, #EECDA3);
                }

            }
        }

    }
</style>
