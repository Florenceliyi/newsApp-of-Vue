<template id='onePieceNews' >
  <div class="news-content" @click="goToNesDes" v-if="item.type == 1 && item.cover.length ==1 ">
    <div class="news">
      <div class="title">{{item.title}}</div>
      <div class="news-img" v-if="item.cover[0]">
        <img :src="item.cover[0].url | formartStr " alt />
      </div>
    </div>
    <p class="des">
      <span>{{item.user.nickname}}</span>
      <span>跟帖 {{item.comment_length}}</span>
    </p>
  </div>
</template>

<script>
import { log } from "util";
export default {
  props: ["item"],
  filters: {
    formartStr(value) {
      const reg = /^http/;
      if (reg.test(value)) {
        return value;
      } else {
        return "http://itluoshuai.cn:3000" + value;
      }
    },
  },
  methods: {
    goToNesDes() {
      //跳转文章详情页，带上文章的id；
      this.$router.push({ path: "/newsDetail", query: { id: this.item.id } });
    },
  },
};
</script>

<style scoped lang='scss'>
.news-content {
  width: 100vw;
  height: 22vh;
  padding: 3vh 0 4vh 3vw;
  background: #ffebed;
  border-bottom: 1px solid #ccc;
  p {
    width: 100%;
  }
  .news {
    display: flex;
    .title {
      width: 60vw;
    }
    .news-img {
      margin-left: 2vw;
      img {
        width: 30vw;
        height: 14vh;
        object-fit: cover;
      }
    }
  }
  .des {
    margin-top: 2vw;
    font-size: 14px;
    color: #666;
    span {
      margin-right: 2vw;
    }
  }
}
</style>