<template id='personCenter'>
  <div class="person">
    <header>
      <div class="profile">
        <div>
          <img class="cat" src="../assets/images/bobo.jpg" alt />
        </div>
      </div>
      <div class="des">
        <div class="gender">
          <i class="iconfont iconxingbienan"></i>波波
        </div>
        <div class="date">2020-08-07</div>
      </div>
      <i class="arrows iconfont iconjiantou1"></i>
    </header>
    <littleComs content="我的关注" detail="关注的用户"></littleComs>
    <littleComs content="我的跟帖" detail="跟帖/回复"></littleComs>
    <littleComs content="我的收藏" detail="文章/视频"></littleComs>
    <littleComs content="设置"></littleComs>
  </div>
</template>
    
<script>
import Vue from "vue";
import littleComs from "../components/littleComs";
export default {
  methods: {},
  components: {
    littleComs,
  },
  mounted() {
    //页面一加载需要渲染页面信息;
    // console.log(localStorage.getItem("id"));
    this.$axios({
      url: Vue.baseURL + "user/" + localStorage.getItem("id"),
    });
  },
};
</script>

<style scoped lang='scss'>
.person {
  width: 100vw;
  height: 100vh;
  background: url("../assets/images/webp.jpg") left bottom;
  header {
    position: relative;
    width: 100vw;
    height: 25vh;
    display: flex;
    align-items: center;
    border-bottom: 4px solid rgb(177, 131, 105);

    .profile {
      flex: 1;
      margin-left: 8vw;
      div {
        width: 22vw;
        border-radius: 50%;
        overflow: hidden;
        .cat {
          width: 30vw;
        }
      }
    }
    .des {
      margin-left: 4vw;
      flex: 3;
      .gender {
        font-size: 18px;
        i {
          color: royalblue;
          margin-right: 4vw;
        }
      }
      .date {
        color: #666;
      }
    }
    .arrows {
      position: absolute;
      font-size: 24px;
      font-weight: bold;
      right: 3vw;
      top: 50%;
      transform: translateY(-50%);
      color: #000;
    }
  }
}
</style>