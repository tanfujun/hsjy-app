<template>
  <div class="detail">
    <van-sticky :offset-top="0">
      <van-nav-bar
        title="详情"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>


    <div class="header">
      <h2>{{ info.title }}</h2>
      <div class="info">
        <p>
          <van-icon name="eye-o"/>
          {{ info.viewCount | formatViewCount}} 阅读
        </p>
        <p>{{ formatTime(info.createTime) }}</p>
        <a class="collect" @click="unCollectNews(info)" v-if="isCollect">
          <van-icon name='like red'/>
        </a>
        <a class="collect" @click="collectNews(info)" v-else>
          <van-icon name='like-o'/>
        </a>
      </div>
    </div>
    <div class="descption">
      {{info.description}}

    </div>
    <div class="message">
      <h2 class="title">评论列表</h2>
      <ul class="list">
        <li class="item" v-for="ele in comments" :key="ele.id">
          <div class="left">
            <van-image
              width="50"
              height="50"
              :src="img_prefix_url + ele.userInfo.imageUrl"
            />

          </div>
          <div class="right">
            <h2>{{ ele.userName}}</h2>
            <p class="time">{{ formatTime1(ele.createTime) }}</p>
            <div class="infos">
              {{ ele.content}}
            </div>
          </div>
        </li>
      </ul>
      <van-pagination @change="getPageComments" v-model="currentPage" :total-items="total"
                      :items-per-page="size"/>

    </div>
    <div class="markup">
      <h2 class="title">评论</h2>
      <van-form @submit="onSubmit">
        <van-field
          :disabled="userInfo._id ? false : true"
          v-model="markup"
          name="markup"
          rows="3"
          autosize
          type="textarea"
          maxlength="150"
          placeholder="请输入留言"
          show-word-limit
        />
        <div style="margin: 10px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
  import {
    getDetail,
    addComment,
    getComments,
    viewCountAdd,
    collectNews,
    collectNewsList,
    cancelCollect
  } from "../../api/news";

  import {img_prefix_url} from '../../config/site';


  import {mapState} from 'vuex'

  var moment = require('moment');
  moment.locale('zh_cn');

  var numeral = require('numeral');

  export default {
    name: "detail",
    data() {
      return {
        img_prefix_url,
        markup: '',
        info: {},
        comments: [],
        currentPage: 1,
        total: 0,
        size: 3,
        id: '',
        uid: '',
        collectIds: [],
      };
    },
    created() {
      this.id = this.$route.params.id ? this.$route.params.id : '0';

      this.getDetail(this.id);
      this.getComments(this.id);
      viewCountAdd(this.id);
      this.collectNewsList();
    },

    computed: {
      isCollect() {
        return this.collectIds.includes(this.id);
      },
      ...mapState(['userInfo']),
    },

    methods: {

      async collectNewsList() {
        if (!this.userInfo._id) {
          this.collectIds = [];
          return;
        }
        let info = await collectNewsList(this.userInfo._id);

        if (info.data.statusCode == 200) {

          this.collectIds = info.data.data.collectionList.collectNewsIds ? info.data.data.collectionList.collectNewsIds : [];


        } else {

        }
      },


      async unCollectNews(item) {
        let info = await cancelCollect(item._id, this.userInfo._id);

        if (info.data.statusCode == 200) {
          this.$notify({type: 'success ', message: '取消收藏', duration: 500});
          this.collectNewsList();
        } else {
          this.$notify('系统繁忙！');
        }


      },

      async collectNews(item) {
        if (!this.userInfo._id) {
          this.$notify({type: 'danger ', message: '请登录后在操作！！！', duration: 1500});
          return;
        }
        let info = await collectNews(item._id, this.userInfo._id);
        if (info.data.statusCode == 200) {
          this.$notify({type: 'success ', message: '收藏成功', duration: 500});
          this.collectNewsList();

        } else {
          this.$notify('系统繁忙！');
        }


      },
      getPageComments(page) {
        this.currentPage = page;
        this.getComments(this.id, this.currentPage, this.size);
      },

      formatTime(val) {
        return moment(val).format('YYYY-MM-DD HH:mm:ss')
      },
      formatTime1(val) {
        return moment(val).fromNow();
      },

      async getComments(id, page = 1, size = 3) {
        let info = await getComments(id, page, size);
        this.comments = info.data.data.commentList;
        this.total = info.data.data.total;

      },

      async getDetail(id) {
        let info = await getDetail(id);
        this.info = info.data.data.info;

      },
      async onSubmit(values) {
        if (!this.userInfo._id) {
          this.$notify({type: 'danger ', message: '请登录后在操作！！！', duration: 1500});
          return;
        }
        if (values.markup.trim() == '') {
          this.$notify({type: 'danger ', message: '请输入内容后提交！！！', duration: 1500});
          return;
        }

        let comments = {
          "content": values.markup,
          "newsId": this.id,
          "title": this.info.title,
        };

        let info = await addComment(comments);
        if (info.data.statusCode == 200) {
          this.markup = '';

          this.$notify({type: 'success ', message: '发布成功', duration: 300});

          this.currentPage = 1;
          this.getComments(this.id);

        } else {
          this.$notify('系统繁忙！');
        }

      },
      onClickLeft() {
        this.$router.back();
      }
    },
    filters: {
      formatViewCount: function (val) {
        return numeral(val).format('0,0');
      }
    }
  }
</script>

<style scoped lang="less">
  .detail {
    background-color: #fff;

    margin-bottom: 1.1rem;

    .header {
      background-color: #fff;
      padding: 0.3rem;

      h2 {
        line-height: 1.4;
        font-size: 0.6rem;
        margin-bottom: 0.2rem;
      }

      .info {
        display: flex;
        align-items: center;

        p {
          margin-right: 0.15rem;
        }

        .collect {
          font-size: 0.5rem;
        }

        .red {
          color: #f00;
        }
      }
    }

    .descption {

      border-top: 2px solid #999;

      background-color: #fff;

      padding: 0.3rem;
      line-height: 1.5;
      text-indent: 2em;

      p {
        margin-bottom: 0.1rem;
      }
    }

    .message {
      .list {
        .item {
          display: flex;
          border-bottom: 1px solid #e4e4e4;
          padding: 0.2rem 0;

          .left {
            margin-right: 0.3rem;
          }

          .right {
            flex: 1;

            > h2 {
              font-size: 0.38rem;
              color: #b8b8b8;
            }

            > p.time {
              padding: 0.3rem 0;
              font-size: 0.28rem;

            }

            .infos {
              line-height: 1.3;
              color: #000;
              font-size: 0.3rem;

              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 5;
              -webkit-box-orient: vertical;

            }

          }

        }
      }
    }

    .markup, .message {
      padding: 0.3rem;

      .title {
        font-size: 0.6rem;
        padding: 0.3rem 0;
      }

    }

  }
</style>
