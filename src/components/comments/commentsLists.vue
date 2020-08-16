<template>
  <div>
    <div class="commit">
      <span></span>
      <span></span>

      <!-- 没有回复时显示此html结构 -->
      <div class="no-reply" v-if="lists && lists.length == 0">
        <div class="commit-title">コメントリスト</div>
        <p>コメント一つもないよ～</p>
      </div>
    </div>
    <!-- 有回复时的结构 -->
    <div class="main_comments">
      <!-- 评论结构 -->
      <div class="reply" v-for="(item, index) in lists" :key="index">
        <div class="all">
          <div class="profile">
            <div>
              <img src="../../assets/images/bobo.jpg" alt />
            </div>
          </div>
          <div class="middle">
            <p class="name">{{item.user.nickname}}</p>
            <p class="time">三時間前</p>
          </div>
          <button class="huifu">返事</button>
        </div>
        <div class="content">{{item.content}}</div>
        <replyComs :commentLists="item.parent" v-if="item.parent"></replyComs>
      </div>
    </div>
  </div>
</template>

<script>
import replyComs from "./replyComs";
export default {
  components: {
    replyComs,
  },
  props: ["lists"],

  mounted() {
    console.log(this.lists);
  },
  methods: {},
};
</script>

<style scoped lang='scss'>
.commit {
  width: 100%;
  margin-top: 3vw;
  position: relative;
  overflow: hidden;
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
    p {
      width: 100%;
      text-align: center;
      margin-top: 6vw;
    }
  }
}
.main_comments {
  width: 100vw;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  margin-top: 4vw;
  padding-bottom: 50vw;
  .reply {
    width: 100%;
    margin-top: 10vw;
    .content {
      padding: 4vw;
      font-size: 18px;
      font-weight: bold;
    }
    .all {
      display: flex;
      justify-content: left;

      button {
        width: 10vw;
        height: 6vw;
      }
    }
    .profile {
      div {
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 12vw;
          height: 12vw;
        }
      }
    }
    .middle {
      font-size: 14px;
      margin: 2vw;
      & > p:nth-child(2) {
        font-size: 12px;
      }
    }
    .huifu {
      font-size: 14px;
      margin-left: 55vw;
      margin-top: 3vw;
    }
  }
}
</style>