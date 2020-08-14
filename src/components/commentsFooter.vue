<template>
  <div class="footer" :class="isShow?'focus_style':''">
    <div class="footer-commit">
      <textarea name id cols="30" rows="10" placeholder="写跟帖" @focus="onFocus" @blur="onBlur"></textarea>
      <button v-show="isShow">发送</button>
    </div>
    <div class="footer-icons" v-show="styleChange">
      <i class="iconfont iconpinglun-">
        <b>4</b>
      </i>
      <span class="star" @click="isClicked" v-text="flag?'★':'☆'" :class="flag?' collected':''"></span>
      <i class="iconfont iconfenxiang"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //是否关注标识;
      flag: false,
      //底部图标是否显现的标识;
      styleChange: true,
      //发送按钮,输入框样式是否显现的标识;
      isShow: false,
    };
  },
  methods: {
    isClicked() {
      this.flag = !this.flag;
      //告诉父组件收藏按钮被点击了;
      this.$emit("sendClick", this.flag);
      //修改图标颜色变黄；
    },
    onFocus() {
      //获取焦点，图标不显示;
      this.styleChange = false;
      //获取焦点，发送按钮显示
      this.isShow = true;
    },
    onBlur() {
      //与获取焦点的判断相反；
      this.styleChange = true;
      this.isShow = false;
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