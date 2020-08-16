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
        src="https://video.pearvideo.com/mp4/adshort/20200421/cont-1670293-15098199_adpkg-ad_hd.mp4"
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
    <commentsLists></commentsLists>
    <!-- 这里是写评论的子组件 -->
    <commentsFooter
      @sendClick="getCollected"
      @sendSonClick="getClick"
      :isWrittingNow="writeCommits"
      @clickComents="clickComents"
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
      isRed: false,
      videoId: 0,
      //判断输入框是否变大的标识;
      writeCommits: false,
    };
  },
  components: {
    commentsFooter,
    commentsLists,
  },
  mounted() {
    this.renderPage();
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
      console.log("父组件被点击了");
      this.writeCommits = false;
    },
    clickComents() {
      //子组件传递一个事件给父组件，父组件接收事件，在父组件中修改值，再传回给子组件；
      //原因：父组件传给子组件的值，不能在子组件中直接修改；
      console.log("子组件被点击了");
      this.writeCommits = true;
    },
  },
};
</script>

<style scoped lang='scss'>
.news-detail {
  width: 100vw;
  height: 206vw;
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
}
</style>