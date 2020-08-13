<template>
  <div class="news-detail">
    <div class="header">
      <i class="arrows iconfont iconjiantou2"></i>
      <img src="../assets/images/logo.png" alt />
    </div>
    <div class="videos-content">
      <span>
        <i class="iconfont iconshipin"></i>
      </span>
      <video src controls></video>
    </div>
    <div class="source">
      <span>
        <img src="../assets/images/bobo.jpg" alt /> 火星时报
      </span>
      <div class="follows">
        <span>关注</span>
      </div>
    </div>
    <div class="title">耿直！关晓彤大方回应私服争议：时好时坏吧</div>

    <div class="news-content"></div>
    <div class="icons">
      <a href="javascript:void(0)">
        <i class="iconfont icondianzan">112</i>
      </a>
      <a href="javascript:void(0)">
        <i class="iconfont iconweixin"></i>微信
      </a>
    </div>

    <!-- 跟帖内容 -->
    <div class="commit">
      <span></span>
      <span></span>
      <!-- <span class="footer-line"></span> -->
      <div class="commit-title">精彩跟帖</div>
      <p>暂无跟帖，抢占沙发</p>
    </div>
    <!-- 这里是写评论的子组件 -->
    <commentsFooter></commentsFooter>
  </div>
</template>

<script>
import commentsFooter from "../components/commentsFooter";
export default {
  components: {
    commentsFooter,
  },
};
</script>

<style scoped lang='scss'>
.news-detail {
  width: 100vw;
  height: 100%;
  padding: 0 3vw;
  background: url("../assets/images/webp.jpg") left bottom;
  .header {
    width: 100%;
    height: 14vw;
    line-height: 14vw;
    i {
      font-size: 19px;
      margin-left: 3vw;
      margin-right: 3vw;
    }
    img {
      width: 20vw;
      height: 10vw;
      margin-bottom: 2vw;
    }
  }
  .videos-content {
    width: 100%;

    position: relative;
    video {
      width: 100%;
    }
    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 22vw;
      height: 20vw;
      border-radius: 50%;
      background: #cccccc;
      i {
        font-size: 20px;
        color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .source {
    font-size: 14px;
    color: #ccc;
    margin-bottom: 4vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3vw;
    & > span:first-child {
      img {
        width: 10vw;
        height: 10vw;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 3vw;
      }
    }
    .follows {
      width: 16vw;
      height: 10vw;
      line-height: 10vw;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 15px;
      color: #000;
    }
  }

  .icons {
    margin-top: 5vw;
    width: 100vw;
    height: 14vw;
    a {
      width: 22vw;
      height: 10vw;
      line-height: 10vw;
      display: inline-block;
      border-radius: 15px;
      border: 1px solid #666;
      text-align: center;
    }
    & > a:nth-child(1) {
      margin-left: 12vw;
      margin-right: 28vw;
    }
    & > a:nth-child(2) {
      i {
        color: #00c800;
      }
    }
  }
  .commit {
    width: 100%;
    height: 30vw;
    margin-top: 3vw;
    position: relative;
    span {
      position: absolute;
      width: 26vw;
      height: 1px;
      background: rgb(177, 131, 105);
      top: 3vw;
    }
    & > span:nth-child(1) {
      left: 4vw;
    }
    & > span:nth-child(2) {
      right: 3vw;
    }
    .footer-line {
      width: 20vw;
      height: 1px;
      bottom: 2vw;
    }
    .commit-title {
      width: 100%;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    p {
      width: 100%;
      text-align: center;
      margin-top: 6vw;
    }
  }
}
</style>