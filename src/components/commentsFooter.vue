<template>
  <div class="footer" :class="isWrittingNow?'focus_style':''" @click.stop="handlerEmit">
    <div class="footer-commit">
      <!-- 弹窗显示 -->
      <textarea
        v-if="isWrittingNow"
        placeholder="写跟帖"
        @click.stop="clickEmit"
        @focus="onFocus"
        ref="textareaInput"
        v-model="inputVal"
        v-focus
      ></textarea>
      <!-- 弹窗不显示 -->
      <textarea v-if="!isWrittingNow" @click="clickEmit" type="text" placeholder="写跟帖" />
      <button v-show="isWrittingNow" @click.stop="sendCommits">发送</button>
    </div>
    <div class="footer-icons" v-show="!isWrittingNow">
      <i class="iconfont iconpinglun-">
        <b>4</b>
      </i>
      <span
        class="star"
        @click.stop="isClicked"
        v-text="flag?'★':'☆'"
        :class="flag?' collected':''"
      ></span>
      <i class="iconfont iconfenxiang" @click.stop></i>
    </div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  data() {
    return {
      //是否关注标识;
      flag: false,
      inputVal: "",
    };
  },
  props: ["isWrittingNow", "parentId"],
  directives: {
    focus: {
      // 这里的el就是被绑定指令的那个元素
      inserted: function (el) {
        el.focus();
      },
    },
  },
  mounted() {},
  methods: {
    isClicked() {
      this.flag = !this.flag;
      //告诉父组件收藏按钮被点击了;
      this.$emit("sendClick", this.flag);
      //修改图标颜色变黄；
    },
    clickEmit() {
      console.log("向父组件传递自定义事件：" + this.isWrittingNow);
      this.$emit("sendShowInput", this.isWrittingNow);
    },

    onFocus() {
      //获取焦点，图标不显示;
      this.styleChange = this.isWrittingNow;
      //获取焦点，发送按钮显示
      this.isShow = !this.isWrittingNow;
    },
    // onBlur() {
    //   //与获取焦点的判断相反；
    //   this.styleChange = true;
    //   this.isShow = false;
    // },
    sendCommits() {
      //子组件传递鼠标点击事件给父组件;
      this.$emit("sendSonClick");
      //子组件接收到父组件传递的事件，改变输入框的样式;

      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!注意父组件传递过来的值不可以直接改写！！！！！；
      // this.isWrittingNow = false;
      console.log(this.isWrittingNow);
      if (!this.isWrittingNow) {
        this.styleChange = !this.isWrittingNow;
        this.isShow = this.isWrittingNow;
      }
      //判断data是否有parentId；
      console.log(this.parentId);
      let data = { content: this.inputVal };
      if (this.parentId) {
        data.parent_id = this.parentId;
      }
      //发布评论的ajax请求;
      this.$axios({
        url: "/post_comment/" + this.$route.query.id,
        //method不能加s
        method: "post",
        data,
      })
        .then((res) => {
          console.log(res);
          //发布成功后清空输入框;
          this.inputVal = "";
          //通知父组件需要重新渲染页面;
          this.$emit("reRender");
        })
        .catch((err) => console.log(err));
    },

    handlerEmit() {
      //子组件接收到父组件传递过来的isWritttingNow数据，子组件再传递一个事件给父组件；
      this.$emit("clickComents");
    },
  },
};
</script>

<style scoped lang='scss'>
.footer {
  width: 100%;
  height: 15vw;
  padding: 0 3vw;
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff;
  &.focus_style {
    height: 32vw;
    .footer-commit {
      display: flex;
      textarea {
        width: 65vw;
        height: 26vw;
      }
      button {
        margin-top: 15vw;
        margin-left: 7vw;
      }
    }
  }
  textarea {
    flex: 1;
    width: 50vw;
    height: 12vw;
    background: #d7d7d7;
    padding-left: 3vw;
    border-radius: 15px;
    padding-top: 3vw;
  }
  button {
    width: 14vw;
    height: 10vw;
    border: 1px solid orange;
    border-radius: 15px;
    margin-left: 8vw;
    color: #fff;
    background: orange;
    // margin-bottom: 5vw;
  }
  .footer-icons {
    margin-left: 5vw;
    flex: 1;
    &.notshow {
      display: none;
    }
    i {
      font-size: 28px;
      color: #000;
      margin: 0 2vw;
    }
    & > i:first-child {
      position: relative;
      b {
        display: block;
        width: 9vw;
        height: 5vw;
        line-height: 5vw;
        color: #fff;
        border-radius: 10px;
        text-align: center;
        position: absolute;
        right: -3vw;
        top: -2vw;
        background: red;
        font-size: 10px;
      }
    }
    .star {
      font-size: 38px;
      margin: 0 4vw;
    }
    .collected {
      color: yellow;
    }
  }
}
</style>