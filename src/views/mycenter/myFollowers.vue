<template>
  <div class="myfollowers">
    <header>
      我的关注
      <i class="iconfont iconjiantou2" @click="goback"></i>
    </header>
    <div class="follower-list">
      <div class="no_content" v-if="friendsData.length == 0">フォロまだないよ～～</div>
        <followers
          v-for="(value, key) in friendsData"
          :key="key"
          :img="value.head_img | formartStr "
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
  filters: {
    formartStr(value) {
      const reg = /^http/;
      if (reg.test(value)) {
        return value;
      } else {
        return "http://itluoshuai.cn:3000" + value;
      }
    },
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
          console.log(res);
          const { data } = res.data;
          // if (!/^http/.test(data.head_img)) {
          //   data.head_img = this.$axios.defaults.baseURL + data.head_img;
          // }
          this.friendsData = data;
          console.log(this.friendsData);
        })
        .catch((err) => console.log(err));
    },
    goback() {
      this.$router.back();
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
  .no_content {
    text-align: center;
    font-weight: bold;
    font-size: 22px;
    margin: 5vw;
  }
}
</style>