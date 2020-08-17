<template>
  <div class="wrapper">
    <!-- v-for="(item, index) in commentLists" :key="index"-->
    <div class="comments" v-if="commentLists">
      <div class="info">
        <div class="user">
          第{{commentDepth}}层楼
          <span>{{commentLists.user.nickname}}</span>
        </div>
        <div class="time">{{timeFormate}}</div>
        <button class="btnReply" @click.stop="popUpInput(commentLists.id)">返事</button>
      </div>
      <div class="content">{{commentLists.content}}</div>

      <!-- 递归结构,有回复（.parent)时才继续递归自己 -->
      <replyComs
        v-if="commentLists.parent"
        :commentLists="commentLists.parent"
        @writeComments="popUpInput"
      ></replyComs>
      <!-- @writeComments="popUpInput" 子组件传递父组件，此时的replyCom是外部replyCom的子组件  -->
    </div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  name: "replyComs",
  data() {
    return {
      isShow: false,
    };
  },
  //父传子的评论跟帖信息
  props: ["commentLists", "writeCommits"],
  computed: {
    //计算回复楼层的深度逻辑
    commentDepth() {
      let depth = 1;
      let current = this.commentLists;
      while (current.parent) {
        // 每当当前节点有 parent
        // 就把深度加一, 并且将parent 设为下次的起点
        depth++;
        current = current.parent;
      }
      return depth;
    },
    //计算时间；
    timeFormate() {
      const currentTime = this.commentLists.create_date;

      return (
        currentTime.split("T")[0] +
        " " +
        currentTime.split("T")[1].split(".")[0]
      );
    },
  },
  methods: {
    popUpInput(parentId) {
      //   this.isShow = !this.writeCommits;
      //给子元素传递partentId
      console.log(parentId);
      this.$emit("writeComments", parentId);
    },
  },
};
</script>

<style scoped lang='scss'>
.comments {
  width: 100%;
  font-size: 14px;
  color: #888;
  padding: 10px;
  border: 1px solid #888;
  margin-top: 5vw;
  .info {
    display: flex;
    .user {
      margin-right: 2vw;
      span {
        font-weight: bold;
        color: #000;
      }
    }
    button {
      width: 10vw;
      height: 6vw;
    }
  }
  .btnReply {
    margin-left: 10vw;
    color: #000;
    width: 16vw;
  }
}
</style>