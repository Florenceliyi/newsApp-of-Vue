<template>
  <div class="footer">
    <div class="footer-commit">
      <input type="text" placeholder="写跟帖" />
    </div>
    <div class="footer-icons">
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
    };
  },
  methods: {
    isClicked() {
      this.flag = !this.flag;
      //告诉父组件收藏按钮被点击了;
      this.$emit("sendClick", this.flag);
      //修改图标颜色变黄；
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
  input {
    flex: 1;
    width: 50vw;
    height: 12vw;
    background: #d7d7d7;
    padding-left: 3vw;
    border-radius: 15px;
  }
  .footer-icons {
    margin-left: 5vw;
    flex: 1;
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