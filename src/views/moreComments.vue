<template>
  <div class="moreComments">
    <header>
      更多跟帖
      <i class="iconfont iconjiantou2" @click="goback"></i>
    </header>
    <div class="wrapper">
      <!-- 评论列表子组件 -->
      <!-- popUpInput触发组件的弹窗弹起，聚焦事件 -->
      <commentsList :lists="commentsLists" @writeComments="popUpInput"></commentsList>
    </div>

    <div class="footer" :class="isActive?'active':''">
      <textarea name id cols="30" rows="10" placeholder="写跟帖" ref="textarea"></textarea>
      <button>发送</button>
    </div>
  </div>
</template>

<script>
import commentsList from "../components/comments/commentsLists";
import { log } from "util";

export default {
  components: {
    commentsList,
  },

  data() {
    return {
      commentsLists: [],
      isActive: "",
    };
  },
  mounted() {
    this.$axios({
      url: "/post_comment/" + this.$route.query.id,
    })
      .then((res) => {
        this.commentsLists = res.data.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    goback() {
      this.$router.back();
    },
    //弹窗弹起并且改写要回复的人名，改变样式；
    popUpInput(isShow) {
      //添加css样式，修改弹窗;
      this.isActive = isShow;
      //文本框聚焦;
      this.$ref.textarea.focus();
    },
  },
};
</script>

<style scoped lang='scss'>
.moreComments {
  width: 100vw;
  height: 100%;
  background: url("../assets/images/webp.jpg") left bottom;
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
  .wrapper {
    padding: 0 4vw;
    ::v-deep .main_comments {
      margin-top: none;
    }
  }
  .footer {
    width: 100%;
    height: 15vw;
    padding: 4vw;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    background: lightcoral;
    textarea {
      width: 70%;
      height: 10vw;
      border-radius: 15px;
      padding-left: 3vw;
      padding-top: 3vw;
    }
    button {
      margin-left: 10vw;
      width: 12vw;
      height: 8vw;
      border-radius: 8px;
      background: #f97979;
    }
    &.active {
      height: 35vw;
      textarea {
        width: 100%;
        height: 28vw;
      }
    }
  }
}
</style>