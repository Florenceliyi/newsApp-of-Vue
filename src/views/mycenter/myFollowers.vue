<template>
  <div class="myfollowers">
    <header>
      我的关注
      <i class="iconfont iconjiantou2"></i>
    </header>
    <div class="follower-list">
      <followers
        v-for="(value, key) in friendsData"
        :key="key"
        :img="value.head_img"
        :nickname="value.nickname"
        :date="value.create_date.split('T')[0]"
        :id="value.id"
        @isClicked="renderPage"
      ></followers>
    </div>
  </div>
</template>

<script>
import followers from "../../components/followersComs";
import { log } from "util";
export default {
  components: {
    followers,
  },
  data() {
    return {
      friendsData: {},
    };
  },
  mounted() {
    //进来发送ajax请求渲染用户列表;
    this.renderPage();
  },
  methods: {
    renderPage() {
      this.$axios({
        url: "/user_follows",
      })
        .then((res) => {
          const { data } = res.data;
          this.friendsData = data;
          console.log(this.friendsData);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped lang='scss'>
.myfollowers {
  width: 100vw;
  height: 170vw;
  background: url("../../assets/images/webp.jpg") left bottom;
  header {
    position: relative;
    width: 100vw;
    height: 20vw;
    line-height: 20vw;
    text-align: center;
    font-weight: bold;
    border-bottom: 2px solid rgb(177, 131, 105);
    i {
      position: absolute;
      top: 50%;
      left: 4vw;
      transform: translateY(-50%);
    }
  }
}
</style>