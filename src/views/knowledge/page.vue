<template>
    <div class="page">
        <van-sticky>

            <van-nav-bar
                    title="试卷列表"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </van-sticky>

        <div class="wrapper" v-if="loading">
            <van-loading color="#1989fa" type="spinner"/>
        </div>

        <van-form v-else @submit="onSubmit">
            <h2 class="title">试卷名称：2022年入党考试题</h2>

            <div class="pannel">
                <h2>单选题</h2>
                <template v-for="(ele, index) in singleQuestion">
                    <div class="card">
                        <h2 class="card-hd">{{ index +1 }}、{{ele.title}}</h2>
                        <van-field
                                :rules="[{ validator: validatorDanxuan, message: '请选择合适的选项...' }]"
                                :name="'radio-'+ ele.id">
                            <template #input>
                                <van-radio-group v-model="radioSelect['radio'+ ele.id]">
                                    <van-radio v-for="(e,k) in ele.options" class="item" :name="k">{{k}} {{e}}
                                    </van-radio>
                                </van-radio-group>
                            </template>
                        </van-field>

                    </div>

                </template>
            </div>

            <div class="pannel">
                <h2>多选题</h2>
                <template v-for="(ele, index) in multipleQuestion">
                    <div class="card">
                        <h2 class="card-hd">{{ index +1 }}、十七大党章中党的基本路线的新表述增加的内容是：</h2>

                        <van-field
                                :rules="[{ validator:validatorCheckBox, message: '请选择合适的选项...' }]"
                                :name="'checkbox-' + ele.id">
                            <template #input>
                                <van-checkbox-group v-model="radioSelect['checkbox' + ele.id]">
                                    <van-checkbox v-for="(e, k) in ele.options" class="item" :name="k">{{k}} {{e}}
                                    </van-checkbox>
                                </van-checkbox-group>
                            </template>
                        </van-field>

                    </div>

                </template>
            </div>

            <div class="pannel">
                <h2>判断题</h2>
                <template v-for="(ele, index) in judgementQuestion">
                    <div class="card">
                        <h2 class="card-hd">{{ index + 1 }}、{{ ele.title }}</h2>

                        <van-field
                                :rules="[{ validator:validatorJudg, message: '请选择合适的选项...' }]"
                                :name="'judg-' + ele.id">
                            <template #input>
                                <van-radio-group v-model="judgList['judg' +  ele.id]">
                                    <van-radio class="item" name="A">对</van-radio>
                                    <van-radio class="item" name="B">错</van-radio>
                                </van-radio-group>
                            </template>
                        </van-field>

                    </div>

                </template>
            </div>

            <div class="pannel">
                <h2>简答题</h2>
                <template v-for="(ele, index) in answerQuestion">
                    <div class="card">
                        <h2 class="card-hd">{{ index + 1 }}、{{ ele.title }}</h2>

                        <van-field
                                :rules="[{ validator:validatorAnswer, message: '' }]"
                                :name="'answer-' + ele.id"
                                v-model="judgList['answer' +  ele.id]"
                                rows="3"
                                autosize
                                type="textarea"
                                maxlength="1000"
                                placeholder="请输入答案"
                                show-word-limit
                        >


                        </van-field>

                    </div>

                </template>
            </div>

            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import {getPageById, submitExam} from "../../api/page";
    import {mapState} from 'vuex';

    export default {
        name: "page",
        data() {
            var radioSelect = {};
            var checkBoxSelect = {};
            var judgList = {};

            for (let i = 1; i < 10; i++) {
                radioSelect[['radio-' + i]] = '';
                checkBoxSelect[['checkbox-' + i]] = [];
                judgList[['judg-' + i]] = '';
            }
            return {
                /*试卷id*/
                pageId: 0,
                loading: true,

                radioSelect,
                checkBoxSelect,
                judgList,
                // 题目
                answerQuestion: [],
                judgementQuestion: [],
                multipleQuestion: [],
                questionType: "",
                singleQuestion: [],
                title: '',
            }
        },
        created() {
            this.pageId = this.$route.params.id;
            this.getPageById();
        },
        computed: {
            ...mapState(['userInfo']),
        },

        methods: {
            onClickLeft() {


                this.$dialog.confirm({
                    title: '标题',
                    message: '是否离开试卷，考试作废！！！',
                })
                    .then(() => {
                        this.$router.back();
                    })
            },
            async getPageById() {
                this.loading = true;
                let info = await getPageById(this.pageId);
                this.loading = false;

                let rs = info.data.data.questionList;

                this.singleQuestion = rs.singleQuestion;
                this.multipleQuestion = rs.multipleQuestion;
                this.judgementQuestion = rs.judgementQuestion;

                this.answerQuestion = rs.answerQuestion;

                this.questionType = rs.questionType;
                this.title = rs.title;

            },

            async onSubmit(values) {
                this.$dialog.confirm({
                    title: '标题',
                    message: '是否提交试卷，一旦提交无法撤销！！！',
                })
                    .then(async () => {

                        let answer = {};

                        for (var attr in values) {

                            answer[attr.split('-')[1]] = values[attr];

                        }

                        var answerInfos = {
                            "title": this.title,
                            "answer": answer,
                            "userName": this.userInfo.name,
                            "userId": this.userInfo._id,
                            "questionId": this.pageId,
                            "answerTime": "00：00：00",
                            "questionType": this.questionType
                        };

                        let info = await submitExam(answerInfos);

                        if (info.data.statusCode == 200) {
                            this.$notify({type: 'success ', message: '试卷已提交', duration: 500});
                            this.$router.push('/show/myexams');
                        } else {
                            this.$notify('系统繁忙！');
                        }

                    })
                    .catch(() => {
                        console.log('cancel');
                        console.log(values);
                    });


            },
            validatorDanxuan(value) {
                var allowItems = ['A', 'B', 'C', 'D'];
                return allowItems.includes(value);
            },
            validatorCheckBox(value) {
                return value.length > 0;
            },
            validatorJudg(value) {
                var allowItems = ['A', 'B'];
                return allowItems.includes(value);
            },

            validatorAnswer(value) {
                return value.trim().length > 0;
            },

        }
    }
</script>

<style scoped lang="less">

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;

        span {
            width: 100px;
            height: 100px;
        }
    }

    .block {
        width: 120px;
        height: 120px;
        background-color: #fff;
    }

    .page {
        margin-bottom: 1.5rem;

        .pannel {
            h2 > {
                font-size: 0.48rem;
                color: #000;
                background-color: #fff;
                padding: 0.2rem 0;
                padding-left: 0.2rem;
                font-weight: 700;
                border-bottom: 1px solid #e4e4e4;

            }
        }

        .title {
            background-color: #fff;
            margin: 0.3rem 0;
            font-size: 0.48rem;
            color: #000;
            padding: 0.1rem 0;
            padding-left: 0.2rem;
            line-height: 1.5;
        }

        .card {
            margin-bottom: 0.2rem;

            .card-hd {
                padding: 0.4rem;
                background-color: #fff;
                font-size: 0.38rem;
                line-height: 1.4;
                color: #000;
                font-weight: 500;
                padding-bottom: 0.2rem;

            }

            .van-radio-group, .van-checkbox-group {
                .item {
                    margin: 0.2rem 0;
                }
            }
        }
    }
</style>
