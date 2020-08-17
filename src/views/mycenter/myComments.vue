<template>
  <div class="my-comments">
    <header>
      我的跟帖
      <i class="iconfont iconjiantou2" @click="goback"></i>
    </header>
    <div class="comments_content">
      <i class="iconfont iconjiantou1"></i>
      <p class="time">2020-8-17 20:50</p>
      <!-- 回复的内容 -->
      <div class="inner-comments">
        <p class="user">回复：火星人</p>
        <p class="reply">阿信是张信哲吗？张信哲是张学友弟弟？</p>
      </div>
      <p class="title">不是</p>
      <div class="origin-news">原文：设计的附件是老款的放假啦空手道解放了是JFK事件发生觉得分厘卡撒酒疯的</div>
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
    height: 30vw;
    padding: 4vw;
    position: relative;
    i {
      position: absolute;
      right: 1vw;
      bottom: 2vw;
    }
    .time {
      color: #ccc;
    }
    .inner-comments {
      font-size: 14px;
      color: #ccc;
    }
  }
}
</style>