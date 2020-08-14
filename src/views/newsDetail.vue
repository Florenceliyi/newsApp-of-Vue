<template>
  <div class="news-detail">
    <div class="header">
      <i class="arrows iconfont iconjiantou2" @click="goBack"></i>
      <img src="../assets/images/logo.png" alt />
      <span
        :class="pageData.has_follow? 'followed':''"
        @click="sendFollowReq"
      >{{pageData.has_follow? '已关注':'关注'}}</span>
    </div>
    <div class="title">{{pageData.title}}</div>
    <div class="source" v-if="pageData.user">
      <span>{{pageData.user.nickname}}</span>
      <span>{{pageData.user.create_date.split('T')[0]}}</span>
    </div>
    <div class="news-content" v-html="pageData.content"></div>
    <div class="icons">
      <a href="javascript:void(0)">
        <i class="iconfont icondianzan"></i>
        {{pageData.like_length}}
      </a>
      <a href="javascript:void(0)">
        <i class="iconfont iconweixin"></i>微信
      </a>
    </div>

    <!-- 跟帖内容 -->
    <div class="commit">
      <span></span>
      <span></span>
      <!-- <span class="footer-line"></span> -->
      <div class="commit-title">精彩跟帖</div>
      <p>暂无跟帖，抢占沙发</p>
    </div>
    <!-- 这里是攥写评论的子组件 -->
    <commentsFooter @sendClick="getCollected"></commentsFooter>
  </div>
</template>

<script>
import commentsFooter from "../components/commentsFooter";
import { log } from "util";
export default {
  components: {
    commentsFooter,
  },
  data() {
    return {
      pageData: {},
      newsId: 0,
    };
  },
  mounted() {
    // const id = location.hash.split("=")[1];
    //this.$route保存了当前页面路由的所有信息;
    console.log(this.$route);
    const id = this.$route.query.id;
    this.newsId = id;
    //一进页面获取对应文章id，渲染页面；
    this.$axios({
      url: "/post/" + this.newsId,
    }).then((res) => {
      console.log(res);
      this.pageData = res.data.data;
    });
  },
  methods: {
    //点击箭头，回退上一页
    goBack() {
      this.$router.back();
    },
    //发送收藏的ajax请求
    getCollected(hasFollowed) {
      console.log(hasFollowed);
      //若是有token则发送收藏请求，没有提示请先登录;
      if (localStorage.getItem("Authorization")) {
        //判断是取消收藏还是收藏的请求；
        if (hasFollowed) {
          //没有关注时；
          this.$axios({
            url: "/post_star/" + this.newsId,
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
        } else {
          this.sendFollowData();
        }
      } else {
        this.$dialog
          .alert({
            message: "ログインしてくださいね～",
            theme: "round-button",
          })
          .then(() => {
            // on close
          });
      }
    },
    sendFollowData() {
      this.$axios({
        url: "/post_star/" + this.newsId,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
    sendFollowReq() {
      //获取关注的用户ID,判断有否token,无提示去登录；
      if (localStorage.getItem("Authorization")) {
        //若是已经关注了；
        console.log(this.pageData.has_follow);
        if (this.pageData.has_follow) {
          this.$axios({
            url: "/user_unfollow/" + this.pageData.user.id,
          }).then((res) => {
            console.log(res.data.message);
            if (res.data.message == "取消关注成功") {
              //修改保存好的关注数据;
              this.pageData.has_follow = false;
            }
          });
        } else {
          //没有关注；
          this.$axios({
            url: "/user_follows/" + this.pageData.user.id,
          })
            .then((res) => {
              console.log(res.data.message);
              if (res.data.message == "关注成功") {
                //修改保存好的关注数据;
                this.pageData.has_follow = true;
              }
            })
            .catch((err) => console.log(err));
        }
      } else {
        this.$dialog
          .alert({
            message: "ログインしてくださいね～",
            theme: "round-button",
          })
          .then(() => {
            // on close
          });
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.news-detail {
  position: relative;
  width: 100vw;
  height: 100%;
  padding: 0 3vw;
  background: url("../assets/images/webp.jpg") left bottom;
  .header {
    width: 100%;
    height: 14vw;
    line-height: 14vw;
    position: relative;
    i {
      font-size: 19px;
      margin-left: 3vw;
      margin-right: 3vw;
    }
    img {
      width: 20vw;
      height: 10vw;
      margin-bottom: 1vw;
    }
    span {
      position: absolute;
      display: block;
      right: 4vw;
      width: 14vw;
      height: 10vw;
      line-height: 10vw;
      text-align: center;
      top: 4vw;
      border: 1px solid #000;
      border-radius: 15px;
      font-weight: bold;
      //已关注的字体和边框变红
      &.followed {
        border: 2px solid rgba(248, 6, 87, 0.986);
        color: rgba(248, 6, 87, 0.986);
      }
    }
  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .source {
    font-size: 16px;
    color: #ccc;
    margin-bottom: 4vw;
    span {
      margin-right: 2vw;
    }
  }
  .news-content {
    ::v-deep img {
      width: 100%;
      margin-bottom: 2vw;
    }
  }
  .icons {
    margin-top: 5vw;
    width: 100vw;
    height: 14vw;
    a {
      width: 22vw;
      height: 10vw;
      line-height: 10vw;
      display: inline-block;
      border-radius: 15px;
      border: 1px solid #666;
      text-align: center;
      i {
        margin-right: 1vw;
      }
    }
    & > a:nth-child(1) {
      margin-left: 12vw;
      margin-right: 28vw;
    }
    & > a:nth-child(2) {
      i {
        color: #00c800;
      }
    }
  }
  .commit {
    width: 100%;
    height: 50vw;
    margin-top: 3vw;
    position: relative;
    span {
      position: absolute;
      width: 26vw;
      height: 1px;
      background: rgb(177, 131, 105);
      top: 3vw;
    }
    & > span:nth-child(1) {
      left: 4vw;
    }
    & > span:nth-child(2) {
      right: 3vw;
    }
    .footer-line {
      width: 20vw;
      height: 1px;
      bottom: 2vw;
    }
    .commit-title {
      width: 100%;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    p {
      width: 100%;
      text-align: center;
      margin-top: 6vw;
    }
  }
}
</style>