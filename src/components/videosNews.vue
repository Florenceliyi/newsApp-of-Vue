<template>
  <div class="news-content">
    <div class="videos">
      <div class="mask" v-show="isShow">
        <div class="play" @click="clicked">
          <i class="iconfont iconshipin"></i>
        </div>
      </div>
      <div class="title">木 雕 炮 姐 御 坂 美 琴</div>

      <video
        src="https://cn-gdfs2-cc-bcache-13.bilivideo.com/upgcxcode/57/14/221341457/221341457-1-16.mp4?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1596857063&gen=playurl&os=bcache&oi=3698568820&trid=b0a14716e97d4672aed0a20a42c78c0ch&platform=html5&upsig=7ee99274eb3186c3a20dd1a239fdebb4&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&cdnid=9842&mid=72987984&cip=211.162.51.156&logo=80000000"
        controls="controls"
      ></video>
      <div class="source">
        <span>火星时报</span>
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