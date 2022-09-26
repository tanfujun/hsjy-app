<template>
    <div>

        <van-empty image="error" description="页面丢失了~~~">
            <van-button @click="goHome" round type="danger" class="bottom-button">返回首页</van-button>
        </van-empty>

    </div>
</template>

<script>
    export default {
        name: "index",
        methods:{
            goHome(){
                console.log('goHome');
                this.$router.push('/news');
            }
        }
    }
</script>

<style scoped>

</style>
