<template>
  <div class="wrapper">
    <!-- v-for="(item, index) in commentLists" :key="index"-->
    <div class="comments" v-if="commentLists">
      <!-- 递归自己的结构 -->
      <div class="info">
        <div class="user">第{{commentDepth}}层楼 {{commentLists.user.nickname}}</div>
        <div class="time">{{commentLists.create_date+ commentLists.create_date}}</div>
        <button class="btnReply">返事</button>
      </div>
      <div class="content">{{commentLists.content}}</div>

      <!-- 递归结构,有回复（.parent)时才继续递归自己 -->
      <replyComs v-if="commentLists.parent" :commentLists="commentLists.parent"></replyComs>
    </div>
  </div>
</template>

<script>
export default {
  name: "replyComs",
  //父传子的评论跟帖信息
  props: ["commentLists"],
  computed: {
    commentDepth() {
      //计算回复楼层的深度逻辑
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
  },
  mounted() {
    console.log(this.commentLists);
    console.log(this.commentDepth);
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
  }
  .btnReply {
    margin-left: 20vw;
    color: #000;
    width: 16vw;
  }
}
</style>