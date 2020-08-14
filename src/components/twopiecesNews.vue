<template id='twopiecesNews'  >
  <div class="news-content" @click="goToNesDes" v-if="item.type ==1 && item.cover.length == 3">
    <div class="title">{{item.title}}</div>
    <div class="images">
      <img v-for="(value, key) in item.cover" :key="key" :src="value.url" alt />
    </div>
    <div class="source">
      <span>{{item.user.nickname}}</span>
      <span>{{item.commont_length}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  mounted() {},
  methods: {
    goToNesDes() {
      this.$router.push({ path: "/newsDetail", query: { id: this.item.id } });
    },
  },
};
</script>

<style scoped lang='scss'>
.news-content {
  width: 100vw;
  height: 30vh;
  padding: 2vh 3vw 4vh 3vw;
  background: #ffebed;
  border-bottom: 1px solid #ccc;
  .title {
    width: 70vw;
  }
  .images {
    display: flex;
    img {
      width: 30vw;
      height: 14vh;
      margin-right: 1vw;
      margin-bottom: 2vh;
    }
  }
  .source {
    span {
      font-size: 14px;
      margin-right: 2vw;
      color: #666;
    }
  }
}
</style>