<template>
  <div>
    <div class="commit">
      <span></span>
      <span></span>
      <!-- 没有回复时显示此html结构 -->
      <div class="no-reply" v-if="lists && lists.length == 0">
        <div class="commit-title">コメントリスト</div>
        <p class="no_comments">コメント一つもないよ～</p>
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
            <p class="time">
              {{ item.create_date.split("T")[0] +
              " " +
              item.create_date.split("T")[1].split(".")[0]}}
            </p>
          </div>
          <!-- 需要阻止事件冒泡 -->
          <button class="huifu" @click.stop="writeComments(item.id)">返事</button>
        </div>
        <div class="content">{{item.content}}</div>
        <!-- 回复的子组件 -->
        <replyComs
          :commentLists="item.parent"
          v-if="item.parent"
          :writeCommits="writeCommits"
          @writeComments="writeComments"
        ></replyComs>
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
  data() {
    return {
      newsId: 0,
      //弹窗不弹起，样式不改变
      isShow: false,
    };
  },
  props: ["lists", "writeCommits"],

  mounted() {
    console.log(this.lists);
  },
  methods: {
    //子组件回复按钮点击，触发传递给父组件;
    writeComments(userId) {
      //样式取反
      this.isShow = !this.writeCommits;
      //子组件传递样式改变的变量给父组件;
      this.$emit("writeComments", this.isShow, userId);

      //回复第一层的评论的逻辑;
      //若是有parentId,带上parentId传给父组件;
      console.log(userId);
    },
  },
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
  }
  .no_comments {
    width: 100%;
    text-align: center;
    margin-top: 6vw;
  }
}
.main_comments {
  width: 100%;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  margin-top: 10vw;
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
      .name {
        font-weight: bold;
      }

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
      margin-left: 45vw;
      margin-top: 3vw;
    }
  }
}
</style>