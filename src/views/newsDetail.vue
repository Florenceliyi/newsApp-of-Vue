<template>
  <div class="news-detail" @click="getClick">
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
      <a href="javascript:void(0)" @click="addLike">
        <i class="iconfont icondianzan dianzan" :class="isRed?'active':''"></i>
        {{pageData.like_length}}
      </a>
      <a href="javascript:void(0)">
        <i class="iconfont iconweixin"></i>微信
      </a>
    </div>

    <!-- 跟帖内容 -->
    <!-- list传递的是文章的评论列表 -->
    <commentsLists :lists="lists" @writeComments="showStyle" :writeCommits="writeCommits"></commentsLists>
    <!-- 更多跟帖按钮，若是数组没有内容不渲染 -->
    <div class="moreComments" v-if="!lists.length == 0">
      <button @click="goToMoreComs">更多跟帖</button>
    </div>
    <!-- 这里是攥写评论的子组件 -->
    <commentsFooter
      @sendClick="getCollected"
      @sendSonClick="getClick"
      :isWrittingNow="writeCommits"
      @clickComents="clickComents"
      @sendShowInput="handlerInput"
      :parentId="parentId"
      @reRender="renderCommentLists"
    ></commentsFooter>
  </div>
</template>

<script>
import commentsFooter from "../components/commentsFooter";
import commentsLists from "../components/comments/commentsLists";
import { log } from "util";
export default {
  components: {
    commentsFooter,
    commentsLists,
  },
  data() {
    return {
      pageData: {},
      //文章id
      newsId: 0,
      //用户id
      userId: 0,
      isRed: false,
      //判断输入框是否变大的标识;
      writeCommits: false,
      //评论列表;
      lists: [],
      //子组件按钮点击，弹窗弹起标识；
      isPopUp: true,
      //回复评论id
      parentId: 0,
    };
  },

  mounted() {
    // const id = location.hash.split("=")[1];
    //this.$route保存了当前页面路由的所有信息;
    //渲染页面的ajax请求;
    // console.log(this.$route);

    const id = this.$route.query.id;
    this.newsId = id;
    //一进页面获取对应文章id，渲染页面；
    this.$axios({
      url: "/post/" + this.newsId,
    }).then((res) => {
      console.log(res);
      this.pageData = res.data.data;
      this.userId = res.data.data.user.id;
      this.renderCommentLists();
    });
  },

  methods: {
    //接收子组件传过来的数据；
    handlerInput(val) {
      console.log("接收子组件传过来的writeCommits:" + val);
      this.writeCommits = val;
      console.log("修改writeCommits：" + val);
    },
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
              this.$toast("关注成功");
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
          // console.log(res);
          this.$toast("取消关注成功");
        })
        .catch((err) => console.log(err));
    },
    //发送关注的请求;
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
    //点赞文章
    addLike() {
      //渲染点赞的ajax请求；
      this.$axios({
        url: "/post_like/" + this.newsId,
      })
        .then((res) => {
          if (res.data.message == "点赞成功") {
            //点赞数应该加1；
            console.log(res.data.message);
            this.pageData.like_length++;
            //修改点赞图标变红;
            this.isRed = true;
          } else {
            //点赞数减1;
            console.log(res.data.message);
            this.pageData.like_length--;
            this.isRed = false;
          }
        })
        .catch((err) => console.log(err));
    },
    //点击文章详情页面，下面的子组件会恢复样式;
    getClick() {
      console.log("父组件被点击了");
      this.writeCommits = false;
    },
    clickComents() {
      //子组件传递一个事件给父组件，父组件接收事件，在父组件中修改值，再传回给子组件；
      //原因：父组件传给子组件的值，不能在子组件中直接修改；
      console.log("子组件被点击了");
      this.writeCommits = true;
    },
    //渲染文章评论列表的方法;
    renderCommentLists() {
      this.$axios({
        url: "/post_comment/" + this.newsId,
      })
        .then((res) => {
          console.log(res.data.data);
          this.lists = res.data.data;
          console.log(this.lists);
        })
        .catch((err) => console.log(err));
    },
    //点击更多跟帖按钮，跳转跟帖页面;
    goToMoreComs() {
      this.newsId = this.$route.query.id;
      this.$router.push({ path: "/moreComments", query: { id: this.newsId } });
    },
    //子组件点击回复按钮传给父组件响应;
    showStyle(show, parentId) {
      //传回给底部条子组件;
      this.writeCommits = show;
      console.log("writeCommits:" + this.writeCommits);
      //保存回复子组件传递过来的用户Id
      this.parentId = parentId;
    },
  },
};
</script>

<style scoped lang='scss'>
.news-detail {
  position: relative;
  width: 100vw;
  height: 206vw;
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
      .dianzan.active {
        color: red;
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
  .moreComments {
    position: relative;
    bottom: 40vw;
    text-align: center;
    margin-top: 5vw;
    button {
      width: 22vw;
      height: 12vw;
      border-radius: 15px;
      background: #f97979;
    }
  }
}
</style>