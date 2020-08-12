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
      <van-tabs sticky swipeable scroll v-model="tabIndex">
        <van-tab
          v-for="(item, index) in tabLists"
          :title="item.name"
          :key="index"
          sticky
          swipeable
          scroll
        >
          <onePieceNews v-for="(item, index) in oneCover" :key="index" :item="item"></onePieceNews>
          <twoPiecesNews v-for="(item, index) in twoCovers" :key="index +1000 " :item="item"></twoPiecesNews>
          <videosNews v-for="(item, index) in videoCover" :key="index + 2000" :item="item"></videosNews>
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
import { log } from "util";

export default {
  data() {
    return {
      active: 0,
      tabLists: "",
      tabIndex: "",
      //需要渲染的图片张数；
      oneCover: [],
      twoCovers: [],
      videoCover: [],
    };
  },
  components: {
    onePieceNews,
    twoPiecesNews,
    videosNews,
  },
  watch: {
    tabIndex: function (val) {
      console.log(val);
    },
  },
  mounted() {
    //进来加载文章列表信息，渲染页面;
    this.$axios({
      url: "/post",
    })
      .then((res) => {
        console.log(res);
        const data = res.data.data;
        // console.log(data)
        //获取data的type属性，如果是1则是图片，2则是视频;
        for (let item of data) {
          if (item.type == 1 && item.cover.length == 1) {
            this.oneCover.push(item);
          } else if (item.type == 1 && item.cover.length > 1) {
            this.twoCovers.push(item);
          } else {
            this.videoCover.push(item);
          }
        }
      })
      .catch((err) => console.log(err));
    //进来加载栏目列表信息;
    this.$axios({
      url: "/category",
    }).then((res) => {
      this.tabLists = res.data.data;
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
      // position: fixed;
      // top: 0;
      // z-index: 666;
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
    ::v-deep .van-tabs__wrap--scrollable .van-tab {
      padding: 0 40px;
    }
    ::v-deep .van-tabs__line {
      left: -1px;
    }
  }
}
</style>
