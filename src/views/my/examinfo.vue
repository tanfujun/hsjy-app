<template>
    <div class="examinfo">
        <van-sticky>
            <van-nav-bar
                    title="答卷详情分析"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </van-sticky>
        <div>
            <van-form>
                <h2 class="title">试卷名称：{{ detail.title }}</h2>

                <div class="pannel">
                    <h2>单选题</h2>
                    <template v-for="(ele, index) in signal">
                        <div class="card">
                            <h2 class="card-hd">{{ index +1 }}、{{ele.title}}</h2>
                            <van-field>
                                <template #input>
                                    <van-radio-group v-model="ele.answer" disabled>
                                        <van-radio v-for="(e,k) in ele.options" class="item" :name="k">{{k}} {{e}}
                                        </van-radio>
                                    </van-radio-group>
                                </template>
                            </van-field>
                            <p class="label-info">{{ ele.message}}</p>
                        </div>

                    </template>
                </div>


                <div class="pannel">
                    <h2>多选题</h2>
                    <template v-for="(ele, index) in multiple">
                        <div class="card">
                            <h2 class="card-hd">{{ index +1 }}、十七大党章中党的基本路线的新表述增加的内容是：</h2>

                            <van-field>
                                <template #input>
                                    <van-checkbox-group disabled v-model="ele.answer">
                                        <van-checkbox v-for="(e, k) in ele.options" class="item" :name="k">{{k}} {{e}}
                                        </van-checkbox>
                                    </van-checkbox-group>
                                </template>
                            </van-field>
                            <p class="label-info">{{ ele.message}}</p>
                        </div>

                    </template>
                </div>

                <div class="pannel">
                    <h2>判断题</h2>
                    <template v-for="(ele, index) in judgement">
                        <div class="card">
                            <h2 class="card-hd">{{ index + 1 }}、{{ ele.title }}</h2>

                            <van-field>
                                <template #input>
                                    <van-radio-group disabled v-model="ele.answer">
                                        <van-radio class="item" name="A">对</van-radio>
                                        <van-radio class="item" name="B">错</van-radio>
                                    </van-radio-group>
                                </template>
                            </van-field>
                            <p class="label-info">{{ ele.message}}</p>
                        </div>

                    </template>
                </div>

                <div class="pannel">
                    <h2>简答题</h2>
                    <template v-for="(ele, index) in answer">
                        <div class="card">
                            <h2 class="card-hd">{{ index + 1 }}、{{ ele.title }}</h2>

                            <van-field
                                    disabled
                                    v-model="ele.answer"
                                    rows="3"
                                    autosize
                                    type="textarea"
                                    maxlength="1000"
                                    placeholder="请输入答案"
                                    show-word-limit
                            >


                            </van-field>
                            <p class="label-info">{{ ele.message}}</p>
                        </div>

                    </template>
                </div>



                <div style="margin: 16px;">
                    <van-button round block type="info" @click="onClickLeft" native-type="submit">返回</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    import {examInfoById} from "../../api/page";

    import {mapState} from 'vuex'

    export default {
        name: "ExamInfo",
        data() {
            return {
                /*当前用户参考试卷的主键id*/
                pageId: 0,
                detail: {},
                signal: [],
                multiple: [],
                judgement: [],
                answer: [],
            }
        },

        computed: {
            ...mapState(['userInfo']),
        },

        created() {
            this.getExamInfo(this.$route.params.id);

        },
        methods: {
            onClickLeft() {
                this.$router.back();

            },

            async getExamInfo(id) {
                let info = await examInfoById(id);
                if (info.data.statusCode) {
                    this.detail = info.data.data.answerDetail;
                    this.signal = this.detail.single.question;
                    this.multiple = this.detail.multiple.question;
                    this.judgement = this.detail.judgement.question;
                    this.answer = this.detail.answer.question;

                } else {
                    this.$notify('系统繁忙！');
                }
            }

        }
    }
</script>

<style lang="less" scoped>
    .examinfo {
        background-color: #fff;
        margin-bottom: 1.5rem;
        padding: 0.2rem;

        .title{
            font-size: 28px;
            line-height: 1.4;
            margin-bottom: 20px;
        }
        .label-info {
            color: #f00;
            padding: 0.2rem 0;
        }

        .pannel {
            > h2 {
                font-size: 20px;
                padding: 0.2rem 0;
                border-bottom: 1px solid #999;
            }

            .card {
                padding: 0.2rem;
            }

            margin-bottom: 0.2rem;
        }
    }
</style>
