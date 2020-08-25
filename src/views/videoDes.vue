<template>
  <div class="news-detail" @click="getClick">
    <div class="header">
      <i class="arrows iconfont iconjiantou2" @click="goBack"></i>
      <img src="../assets/images/logo.png" alt />
    </div>
    <div class="videos-content">
      <!-- <span>
        <i class="iconfont iconshipin"></i>
      </span>-->
      <video
        v-if="pageData.cover"
        :src="pageData.content"
        controls
        :poster="pageData.cover[0].url"
        ref="video"
      ></video>
    </div>
    <div class="source" v-if="pageData.user">
      <span>
        <img :src="this.$axios.defaults.baseURL + pageData.user.head_img" alt />
        {{pageData.user.nickname}}
      </span>
      <div class="follows" :class="pageData.has_follow? 'followed':''" @click="sendFollowReq">
        <span>{{pageData.has_follow? '已关注':'关注'}}</span>
      </div>
    </div>
    <div class="title">{{pageData.title}}</div>

    <div class="news-content"></div>
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
      :has_star="has_star"
    ></commentsFooter>
  </div>
</template>

<script>
import commentsFooter from "../components/commentsFooter";
import commentsLists from "../components/comments/commentsLists";
import { log } from "util";
export default {
  data() {
    return {
      pageData: {},
      //文章id
      videoId: 0,
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
      parentId: undefined,
      //有无关注的标识;
      has_star: false,
    };
  },
  components: {
    commentsFooter,
    commentsLists,
  },
  mounted() {
    const id = this.$route.query.id;
    this.videoId = id;
    //一进页面获取对应文章id，渲染页面；
    this.$axios({
      url: "/post/" + this.videoId,
    }).then((res) => {
      this.pageData = res.data.data;
      //正则表达式匹配取出iframe标签中的视频地址；
      let test = res.data.data.content;
      //match匹配返回的是一个数组；
      test = test.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i);
      console.log(test);
      test = test[0].match(/(?<=").*?(?=")/g);
      // console.log(test[0]);
      this.pageData.content = test[0];
      console.log(this.pageData.content);
      this.userId = res.data.data.user.id;
      this.has_star = res.data.data.has_star;
      //渲染评论列表；
      this.renderCommentLists();
    });
    // this.renderPage();
  },
  methods: {
    //点击箭头，回退上一页
    goBack() {
      this.$router.back();
    },
    //发送收藏的ajax请求
    getCollected(flag) {
      console.log("现在文章耳的收场专题：" + flag);
      //若是有token则发送收藏请求，没有提示请先登录;
      if (localStorage.getItem("Authorization")) {
        this.$axios({
          url: "/post_star/" + this.videoId,
        }).then((res) => {
          if (res.data.message == "收藏成功") {
            console.log("收藏成功");
            this.has_star = true;
          } else if (res.data.message == "取消成功") {
            console.log("取消收藏");
            this.has_star = false;
          }
          // this.$toast("收藏成功");
        });
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
        url: "/post_star/" + this.videoId,
      })
        .then((res) => {
          console.log(res);
          this.$toast("取消关注成功");
        })
        .catch((err) => console.log(err));
    },
    renderPage() {
      const id = this.$route.query.id;
      this.videoId = id;
      //一进页面获取对应文章id，渲染页面；
      this.$axios({
        url: "/post/" + this.videoId,
      })
        .then((res) => {
          // console.log(res);
          this.pageData = res.data.data;
          this.pageData.content = this.pageData.content.split("?")[0];
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
    //点赞文章
    addLike() {
      //渲染点赞的ajax请求；
      this.$axios({
        url: "/post_like/" + this.videoId,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.message == "点赞成功") {
            //点赞数应该加1；
            console.log(res.data.message);
            this.pageData.like_length++;
            //修改点赞图标变红;
            this.isRed = true;
          } else if (res.data.message == "取消成功") {
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
      this.parentId = undefined;
      // console.log("父组件被点击了");
      this.writeCommits = false;
      console.log("点击发送按钮发送消息，重新渲染评论列表");
      console.log("现在的lists数据：");
      console.log(this.lists);
    },
    clickComents() {
      //子组件传递一个事件给父组件，父组件接收事件，在父组件中修改值，再传回给子组件；
      //原因：父组件传给子组件的值，不能在子组件中直接修改；
      console.log("子组件被点击了");
      this.writeCommits = true;
    },
    //接收子组件传过来的数据；
    handlerInput(val) {
      console.log("接收子组件传过来的writeCommits:" + val);
      this.writeCommits = val;
      console.log("修改writeCommits：" + val);
    },
    //渲染文章评论列表的方法;
    renderCommentLists() {
      this.$axios({
        url: "/post_comment/" + this.videoId,
      })
        .then((res) => {
          console.log(res.data.data);
          //放入数据前先清空一下存放数据的数组；
          this.lists = [];
          //只渲染3条数据;
          res.data.data.forEach((data, index) => {
            if (index <= 2) {
              this.lists.push(data);
            }
          });

          console.log(this.lists);
        })
        .catch((err) => console.log(err));
    },
    //点击更多跟帖按钮，跳转跟帖页面;
    goToMoreComs() {
      this.videoId = this.$route.query.id;
      this.$router.push({ path: "/moreComments", query: { id: this.videoId } });
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
  width: 100vw;
  min-height: 200vw;
  padding: 0 3vw;
  background: url("../assets/images/webp.jpg") left bottom;
  .header {
    width: 100%;
    height: 14vw;
    line-height: 14vw;
    i {
      font-size: 19px;
      margin-left: 3vw;
      margin-right: 3vw;
    }
    img {
      width: 20vw;
      height: 10vw;
      margin-bottom: 2vw;
    }
  }
  .videos-content {
    width: 100%;

    position: relative;
    video {
      width: 100%;
      max-height: 100vw;
      object-fit: cover;
    }
    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 22vw;
      height: 20vw;
      border-radius: 50%;
      background: #cccccc;
      i {
        font-size: 20px;
        color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .source {
    font-size: 14px;
    color: #ccc;
    margin-bottom: 4vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3vw;
    & > span:first-child {
      img {
        width: 10vw;
        height: 10vw;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 3vw;
      }
    }
    .follows {
      width: 16vw;
      height: 10vw;
      line-height: 10vw;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 15px;
      color: #000;
      &.followed {
        border: 1px solid red;
        color: red;
      }
    }
  }

  .icons {
    margin-top: 5vw;
    width: 100%;
    height: 14vw;
    a {
      width: 22vw;
      height: 10vw;
      line-height: 10vw;
      display: inline-block;
      border-radius: 15px;
      border: 1px solid #666;
      text-align: center;
      .dianzan.active {
        color: red;
      }
    }
    & > a:nth-child(1) {
      margin-left: 12vw;
      margin-right: 28vw;
      i {
        margin-right: 1vw;
      }
    }
    & > a:nth-child(2) {
      i {
        color: #00c800;
      }
    }
  }
  .commit {
    width: 100%;
    height: 30vw;
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