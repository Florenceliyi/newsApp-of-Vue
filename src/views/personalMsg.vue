<template>
  <div class="personalMsg">
    <div class="msg">
      <div class="title">
        编辑资料
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="profile">
        <div>
          <img class="cat" src="../assets/images/bobo.jpg" alt />
        </div>
      </div>
    </div>
    <littleComs content="昵称" detail="火星网友"></littleComs>
    <littleComs content="密码" detail="*****"></littleComs>
    <littleComs content="性别" detail="女"></littleComs>
  </div>
</template>

<script>
import littleComs from "../components/littleComs";
export default {
  components: {
    littleComs,
  },
};
</script>

<style scoped lang='scss'>
.personalMsg {
  width: 100vw;
  height: 100vh;
  background: url("../assets/images/webp.jpg") left bottom;
  .msg {
    width: 100vw;
    height: 50vw;
    border-bottom: 2px solid #b18369;
    .title {
      width: 100vw;
      height: 20vw;
      line-height: 20vw;
      font-weight: bold;
      text-align: center;
      position: relative;
      i {
        position: absolute;
        left: 4vw;
      }
    }
    .profile {
      position: relative;
      div {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 22vw;
        border-radius: 50%;
        overflow: hidden;
        .cat {
          width: 30vw;
        }
      }
    }
  }
}
</style>