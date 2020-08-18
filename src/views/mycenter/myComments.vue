<template>
  <div class="my-comments">
    <header>
      我的跟帖
      <i class="iconfont iconjiantou2" @click="goback"></i>
    </header>
    <div class="comments_content" v-for="(item) in userCommits" :key="item.id">
      <i class="iconfont iconjiantou1" @click="$router.push('/newsDetail/?id='+ item.post.id)"></i>
      <p class="time">{{item.create_date.split("T")[0]}}</p>
      <!-- 回复的内容 -->
      <div class="inner-comments" v-if="item.parent">
        <p class="user">回复：{{item.parent.user.nickname}}</p>
        <p class="reply">{{item.parent.content}}</p>
      </div>
      <p class="title">{{item.content}}</p>
      <div class="newsSource">原文：{{item.post.title}}</div>
    </div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  data() {
    return {
      //用户的评论数据
      userCommits: [],
    };
  },
  mounted() {
    //进入页面加载评论列表；
    this.renderCommentsLists();
  },

  methods: {
    goback() {
      this.$router.replace("/myCenter");
    },
    renderCommentsLists() {
      //进入页面渲染用户评论列表;
      this.$axios({
        url: "/user_comments",
      })
        .then((res) => {
          console.log(res);
          this.userCommits = res.data.data;
          console.log(this.userCommits);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped lang='scss'>
.my-comments {
  width: 100vw;
  height: 170vw;
  background: url("../../assets/images/webp.jpg") left bottom;
  header {
    position: relative;
    width: 100vw;
    height: 20vw;
    line-height: 20vw;
    text-align: center;
    font-weight: bold;
    border-bottom: 2px solid rgb(177, 131, 105);
    i {
      position: absolute;
      top: 50%;
      left: 4vw;
      transform: translateY(-50%);
    }
  }
  .comments_content {
    width: 100%;
    padding: 5vw 5vw 11vw;
    position: relative;
    border-bottom: 1px solid #ccc;
    i {
      position: absolute;
      right: 6vw;
      bottom: 2vw;
      font-weight: bold;
      font-size: 20px;
    }
    .time {
      color: #666;
      margin-bottom: 3vw;
    }
    .inner-comments {
      width: 100%;
      padding: 5vw;
      height: 25vw;
      background: #f2f2f2;
      font-size: 14px;
      color: #888;
      .user {
        margin-bottom: 4vw;
      }
    }
    .title {
      margin: 4vw 0;
      font-size: 18px;
    }
    .newsSource {
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #666;
    }
  }
}
</style>