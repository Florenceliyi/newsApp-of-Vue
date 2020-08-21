<template>
  <div class="myCollection">
    <header>
      我的收藏
      <i class="iconfont iconjiantou2" @click="goback"></i>
    </header>
    <div class="no_content" v-if="pageData.length == 0">コレクションまだないよ～～</div>
    <!-- 判断是哪一种子组件进行渲染 -->
    <div class="news-content" v-for="(item,index) in pageData" :key="index">
      <oneNews v-if="item.type == 1 && item.cover.length >=1 && item.cover.length < 3" :item="item"></oneNews>
      <fewNews
        v-else-if="item.type == 1 && item.cover.length >=1 && item.cover.length <= 3"
        :item="item"
      ></fewNews>
      <videoNews v-else-if="item.type == 2 && item.cover[0].url" :item="item"></videoNews>
    </div>
  </div>
</template>

<script>
import oneNews from "../../components/onePieceNews";
import fewNews from "../../components/twopiecesNews";
import videoNews from "../../components/videosNews";

import { log } from "util";
export default {
  components: {
    oneNews,
    fewNews,
    videoNews,
  },

  data() {
    return {
      pageData: {},
    };
  },
  mounted() {
    //一进页面渲染收藏页的文章列表；
    this.$axios({
      url: "/user_star",
    })
      .then((res) => {
        console.log(res);
        this.pageData = res.data.data;
        console.log(this.pageData);
      })
      .catch((err) => console.log(err));
  },
  methods: {
    goback() {
      this.$router.replace("/myCenter");
    },
  },
};
</script>

<style scoped lang='scss'>
.myCollection {
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
  .no_content {
    text-align: center;
    font-weight: bold;
    font-size: 22px;
    margin: 5vw;
  }
}
</style>