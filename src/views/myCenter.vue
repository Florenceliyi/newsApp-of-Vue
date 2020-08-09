<template id='personCenter'>
  <div class="person">
    <header>
      <div class="profile">
        <div>
          <img v-if="headImg" class="cat" :src="headImg" alt />
          <img v-else src="../assets/images/bobo.jpg" class="cat" alt />
        </div>
      </div>
      <div class="des">
        <div class="gender">
          <i :class="[flag== 1?'iconfont iconxingbienan':'iconfont iconxingbienv']"></i>
          {{username}}
        </div>
        <div class="date">{{date}}</div>
      </div>
      <i class="arrows iconfont iconjiantou1"></i>
    </header>
    <littleComs content="我的关注" detail="关注的用户" @sonIsClicked="jumpTo" id="1"></littleComs>
    <littleComs content="我的跟帖" detail="跟帖/回复" @sonIsClicked="jumpTo" id="2"></littleComs>
    <littleComs content="我的收藏" detail="文章/视频" @sonIsClicked="jumpTo" id="3"></littleComs>
    <littleComs content="设置" @sonIsClicked="jumpTo" id="4"></littleComs>
    <littleComs content="退出登录" @sonIsClicked="jumpTo" id="5"></littleComs>
  </div>
</template>
    
<script>
import Vue from "vue";
import littleComs from "../components/littleComs";
export default {
  methods: {
    jumpTo(id) {
      //通过id判断要跳转到哪个页面；
      //我的关注
      if (id == 1) {
        console.log(1111);
      } else if (id == 2) {
        //我的跟帖
        console.log(2222);
      } else if (id == 3) {
        //我的收藏
      } else if (id == 4) {
        //设置
      } else {
        //退出登录
      }
    },
  },
  components: {
    littleComs,
  },
  data() {
    return {
      //性别标识
      flag: 1,
      //头像;
      headImg: "",
      //用户名
      username: "",
      //日期
      date: "",
    };
  },
  mounted() {
    //页面一加载需要渲染页面信息;
    // console.log(localStorage.getItem("id"));
    // console.log(Vue.baseURL + "/user/:" + localStorage.getItem("id"));
    this.$axios({
      url: Vue.baseURL + "/user/" + localStorage.getItem("id"),
    })
      .then((res) => {
        //获取成功渲染数据到页面;
        if (res.status == 200) {
          this.username = res.data.data.username;
          this.headImg = Vue.baseURL + res.data.data.head_img;
          this.date = res.data.data.create_date;
        }
      })
      .catch((err) => console.log(err));
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