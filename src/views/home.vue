<template id='home'>
  <div class="home">
    <div class="header">
      <a href="#" class="logo"></a>
      <div class="search">
        <i class="iconfont iconsearch"></i>
        <input type="text" placeholder="搜索新闻" />
      </div>
      <a href="#" class="login iconfont iconwode"></a>
    </div>
    <van-tabs v-model="active" animated class="nav">
      <van-tab v-for="index in 6" :title="'关注 ' + index" :key="index">关注 {{ index }}</van-tab>
    </van-tabs>
    <div class="newsLists"></div>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
Vue.use(Tab);
Vue.use(Tabs);
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style scoped lang='scss'>
input::-webkit-input-placeholder {
  color: #fff;
  //   font-size: 16px;
}
.home {
  width: 100vw;
  height: 100vh;
  background: #ffccd1;

  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 10vh;
    background: #f44236;
    padding: 2vw 4vw 2vw 0vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
    .logo {
      display: inline-block;
      width: 27vw;
      height: 7vh;
      background: url("../assets/images/logo.png") no-repeat center;
      background-size: cover;
      color: #fff;
      padding-left: 8vw;
    }
    .search {
      width: 45vw;
      height: 7vh;
      border-radius: 50%;
      position: relative;
      color: #fff;
      i {
        position: absolute;
        left: 9vw;
        top: 50%;
        transform: translateY(-50%);
      }
      input {
        width: 100%;
        height: 100%;
        background: #f97979;
        color: #fff;
        border-radius: 25px;
        padding-left: 14vw;
      }
    }

    .login {
      font-size: 30px;
      color: #fff;
    }
  }
  .nav {
    width: 100%;
    position: fixed;
    top: 10vh;
    z-index: 998;
  }
}
</style>
