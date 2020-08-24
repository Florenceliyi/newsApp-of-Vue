<template>
  <div class="moreComments" @click="onBlur">
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
      <textarea
        name
        id
        cols="30"
        rows="10"
        :placeholder="placeholder"
        v-focus
        v-model="inputVal"
        ref="textarea"
        @click.stop="popUpInput"
      ></textarea>
      <button @click="sendComments">发送</button>
    </div>
  </div>
</template>

<script>
import commentsList from "../components/comments/commentsLists";
import commentsFooter from "../components/commentsFooter";
import { log } from "util";

export default {
  components: {
    commentsList,
    commentsFooter,
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  data() {
    return {
      commentsLists: [],
      isActive: "",
      parentId: 0,
      inputVal: "",
      placeholder: "",
      nickname: "",
    };
  },
  computed: {
    //获取回复用户的名称的逻辑;
    replyTo() {
      if (this.nickname) {
        this.placeholder = "@" + this.nickname + ":";
      } else {
        this.placeholder = "写跟帖";
      }
      return this.placeholder;
    },
  },
  mounted() {
    //渲染评论列表的方法;
    this.renderComments();
  },
  methods: {
    goback() {
      this.$router.back();
    },
    //弹窗弹起并且改写要回复的人名，改变样式；
    popUpInput(isShow, userId, nickname) {
      //添加css样式，修改弹窗;
      this.isActive = isShow;
      //鼠标聚焦;
      this.$refs.textarea.focus();
      //储存子组件传过来的回复用户的id;
      this.parentId = userId;
      //储存子组件传过来的回复用户的名称;
      this.nickname = nickname;
      //修改输入框的回复对象内容;
      this.replyTo;
    },
    //点击空白回复处失去焦点;
    onBlur() {
      console.log(111111);
      this.isActive = false;
      //鼠标聚焦;
      this.$refs.textarea.focus();
      //输入框内容为写跟帖
      this.placeholder = "写跟帖";
    },
    renderComments() {
      this.$axios({
        url: "/post_comment/" + this.$route.query.id,
      })
        .then((res) => {
          this.commentsLists = res.data.data;
          console.log(this.commentsLists);
        })
        .catch((err) => console.log(err));
    },
    //发送评论的逻辑;
    sendComments() {
      //输入内容为空时提示用户输入;
      if (this.inputVal == "") {
        this.$toast("何かが書かないと。。");
        return;
      }
      this.$axios({
        url: "/post_comment/" + this.$route.query.id,
        method: "post",
        data: {
          content: this.inputVal,
          parent_id: this.parentId || "",
        },
      })
        .then((res) => {
          console.log(res);
          //发送成功后清空输入框;
          this.inputVal = "";
          //重新渲染评论列表;
          this.renderComments();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped lang='scss'>
.moreComments {
  width: 100vw;
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
      width: 20vw;
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