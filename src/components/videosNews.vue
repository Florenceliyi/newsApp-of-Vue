<template>
  <div class="news-content">
    <div class="videos">
      <div class="mask" v-show="isShow">
        <div class="play" @click="clicked">
          <i class="iconfont iconshipin"></i>
        </div>
      </div>
      <div class="title">{{item.title}}</div>

      <img :src="item.cover[0].url" alt />
      <div class="source">
        <span>{{item.user.nickname}}</span>
        <span>52跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
  props: ["item"],
  mounted() {
    // console.log(this.item);
  },
  methods: {
    clicked() {
      this.isShow = false;
    },
  },
};
</script>

<style scoped lang='scss'>
.news-content {
  width: 100vw;
  height: 68vw;
  position: relative;
  padding: 3vh 3vw 4vh 3vw;
  background: #ffebed;
  border-bottom: 1px solid #ccc;
  .videos {
    width: auto;
    position: relative;
    video {
      width: 100%;
    }
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      z-index: 99;
      .play {
        width: 12vw;
        height: 12vw;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background: #666;
        z-index: 100;
        i {
          position: absolute;
          left: 50%;
          top: 50%;
          font-size: 30px;
          transform: translate(-50%, -50%);
          color: #fff;
        }
      }
    }
    .title {
      position: absolute;
      color: #fff;
      margin-top: 4vw;
      margin-left: 4vw;
      width: 70vw;
    }
  }
  img {
    width: 100%;
  }
  .source {
    position: absolute;
    bottom: -10vw;
    span {
      font-size: 14px;
      margin-right: 2vw;
      color: #666;
    }
  }
}
</style>