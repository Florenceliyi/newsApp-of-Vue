<template>
  <div class="followers">
    <div class="friends">
      <img v-if="img" :src="this.$axios.defaults.baseURL + img" alt />
    </div>
    <div class="title">
      <p>{{nickname}}</p>
      <p>{{date}}</p>
    </div>
    <div class="delfs">
      <button @click="delFriend">取消关注</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["img", "nickname", "date", "id"],

  methods: {
    //渲染用户列表的方法：
    // renderPage() {
    //   this.$axios({
    //     url: "/user_follows",
    //   })
    //     .then((res) => {
    //       const { data } = res.data;
    //       this.friendsData = data;
    //       console.log(this.friendsData);
    //     })
    //     .catch((err) => console.log(err));
    // },
    delFriend() {
      this.$axios({
        url: "/user_unfollow/" + this.id,
      })
        .then((res) => {
          this.$toast.success(res.data.message);
          //告诉关注页父组件，取消关注被点击了，需要刷新页面;
          this.$emit("isClicked");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped lang='scss'>
.followers {
  width: 100vw;
  height: 20vw;
  border-bottom: 2px solid rgb(177, 131, 105);
  padding: 4vw 0vw 3vw 4vw;
  display: flex;
  align-items: center;
  .friends {
    flex: 1;
    width: 22vw;
    height: 13vw;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 3vw;
    img {
      width: 100%;
    }
  }
  .title {
    flex: 3;

    & > p:nth-child(2) {
      font-size: 14px;
      color: #666;
    }
  }
  .delfs {
    flex: 2;
    button {
      width: 20vw;
      height: 10vw;
      border-radius: 10px;
      line-height: 10vw;
      text-align: center;
      background: #e77669;
    }
  }
}
</style>