<template id='home'>
  <div class="home">
    <div class="pre-header">
      <!-- 头部 -->
      <div class="header">
        <a href="#" class="logo"></a>
        <div class="search">
          <i class="iconfont iconsearch"></i>
          <input type="text" placeholder="搜索新闻" />
        </div>
        <a href="#" class="login iconfont iconwode"></a>
      </div>
      <!-- 新闻导航 -->
      <van-tabs sticky swipeable scroll>
        <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index" sticky swipeable scroll>
          <onePieceNews></onePieceNews>
          <twoPiecesNews></twoPiecesNews>
          <videosNews></videosNews>
          <videosNews></videosNews>
          <videosNews></videosNews>
          <videosNews></videosNews>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// import { Tab, Tabs } from "vant";
import onePieceNews from "../components/onePieceNews";
import twoPiecesNews from "../components/twopiecesNews";
import videosNews from "../components/videosNews";
import axios from "axios";

export default {
  data() {
    return {
      active: 0,
    };
  },
  components: {
    onePieceNews,
    twoPiecesNews,
    videosNews,
  },

  mounted() {
    this.$axios({
      url: "/post",
      method: "GET",
      params: {},
    }).then((res) => {
      console.log(res);
    });
  },
  methods: {
    scroll(data) {
      console.log(data);
    },
  },
};
</script>

<style scoped lang='scss'>
input::-webkit-input-placeholder {
  color: #fff;
  //   font-size: 16px;
}
.home {
  // position: relative;
  overflow: hidden;
  background: #ffccd1;
  .pre-header {
    ::v-deep .header {
      position: fixed;
      top: 0;
      z-index: 666;
      width: 100vw;
      height: 10vh;
      background: #f44236;
      padding: 2vw 4vw 2vw 0vw;
      display: flex;
      justify-content: space-between;
      align-items: center;

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
    // .nav {
    //   width: 100%;
    // }
  }
}
</style>
