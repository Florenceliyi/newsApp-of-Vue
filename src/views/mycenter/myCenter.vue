<template id='personCenter'>
  <div class="person">
    <router-view></router-view>
    <header>
      <div class="profile">
        <div>
          <router-link
            to="/mycenter/personalMsg"
            tag="img"
            v-if="headImg"
            class="cat"
            :src="$axios.defaults.baseURL+headImg"
            alt
          ></router-link>
          <router-link
            to="/mycenter/personalMsg"
            tag="img"
            v-else
            src="../../assets/images/bobo.jpg"
            class="cat"
            alt
          ></router-link>
        </div>
      </div>
      <div class="des">
        <div class="gender" v-if="username">
          <i :class="[flag== 1?'iconfont iconxingbienan':'iconfont iconxingbienv']"></i>
          {{username}}
        </div>
        <div class="date">{{date}}</div>
      </div>
      <router-link to="/mycenter/personalMsg" tag="i" class="arrows iconfont iconjiantou1"></router-link>
    </header>
    <littleComs content="我的关注" detail="关注的用户" @sonIsClicked="jumpTo" id="1"></littleComs>
    <littleComs content="我的跟帖" detail="跟帖/回复" @sonIsClicked="jumpTo" id="2"></littleComs>
    <littleComs content="我的收藏" detail="文章/视频" @sonIsClicked="jumpTo" id="3"></littleComs>
    <littleComs content="设置" @sonIsClicked="jumpTo" id="4"></littleComs>
    <littleComs content="退出登录" @sonIsClicked="jumpTo" id="5"></littleComs>

    <!-- 编辑页面的弹窗组件 -->
    <van-popup v-model="show">
      <personal></personal>
    </van-popup>
  </div>
</template>
    
<script>
import Vue from "vue";
import littleComs from "../../components/littleComs";
import personal from "./personalMsg";
// Vue.use(Popup);
export default {
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
      //编辑资料的弹出框显示;
      show: false,
    };
  },
  methods: {
    //点击组件跳转页面方法；
    jumpTo(id) {
      //通过id判断要跳转到哪个页面；
      //我的关注
      if (id == 1) {
        this.$router.push("/myFollowers");
      } else if (id == 2) {
        //我的跟帖
        console.log(2222);
      } else if (id == 3) {
        //我的收藏
      } else if (id == 4) {
        //设置
      } else {
        //退出登录
        /*1.点击确认，清理token信息，点击取消，则不清理2.跳转回首页*/

        this.$dialog
          .confirm({
            message: "ログアウト確認？",
          })
          .then(() => {
            // on confirm
            //清理token
            localStorage.removeItem("Authorization");
            //跳转回首页
            this.$router.push("/home");
          })
          .catch(() => {
            // on cancel
          });
      }
    },
  },
  components: {
    littleComs,
    personal,
  },

  mounted() {
    //页面一加载需要渲染页面信息;
    // console.log(localStorage.getItem("id"));
    // console.log(Vue.baseURL + "/user/:" + localStorage.getItem("id"));
    this.$axios({
      //JWT标准 json web token
      url: "/user/" + localStorage.getItem("id"),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Authorization"),
      },
    })
      .then((res) => {
        //获取成功渲染数据到页面;
        if (res.status == 200) {
          this.username = res.data.data.username;
          this.headImg = res.data.data.head_img;
          //取出T前的日期
          this.date = res.data.data.create_date.split("T")[0];
        }
      })
      .catch((err) => console.log(err));
  },
  //
  beforeRouteUpdate(to, from, next) {
    console.log(to);
    console.log(from);
    next();
  },
};
</script>

<style scoped lang='scss'>
.person {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/images/webp.jpg") left bottom;
  position: relative;
  header {
    position: relative;
    width: 100vw;
    height: 25vh;
    display: flex;
    align-items: center;
    border-bottom: 2px solid rgb(177, 131, 105);
    .profile {
      flex: 1;
      div {
        width: 30vw;
        height: 30vw;
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