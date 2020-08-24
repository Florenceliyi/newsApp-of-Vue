<template>
  <div class="mask">
    <div class="personalMsg">
      <div class="msg">
        <div class="title">
          编辑资料
          <i class="iconfont iconjiantou2" @click="goBack"></i>
        </div>
        <div class="profile">
          <van-uploader :after-read="afterRead" />
          <div class="image">
            <img class="cat" :src="srcImg | formartStr" alt v-if="srcImg" />
          </div>
        </div>
      </div>
      <div class="personal-msg">
        <littleComs content="昵称" :detail="userData.nickname"></littleComs>
        <littleComs content="用户名" :detail="userData.username"></littleComs>
        <littleComs content="密码" detail="******"></littleComs>
        <littleComs content="性别" :detail="userData.gender==1?'男':'女'"></littleComs>
      </div>
      <div class="button" @click="edit">修改信息</div>
      <EditPopUp v-show="isShow" @popUp="getConditions"></EditPopUp>
    </div>
  </div>
</template>

<script>
import littleComs from "../../components/littleComs";
import EditPopUp from "../../components/EditPopUp";
import { log } from "util";

export default {
  data() {
    return {
      userData: {},
      isShow: false,
      srcImg: "",
    };
  },
  components: {
    littleComs,
    EditPopUp,
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
    this.renderPage();
  },
  methods: {
    //渲染页面函数;
    renderPage() {
      //页面一加载，发送axios请求,渲染已经有的个人信息；
      this.$axios({
        url: "user/" + localStorage.getItem("id"),
        //
      })
        .then((res) => {
          //渲染数据到页面；
          const { data } = res.data;
          console.log(data);
          this.srcImg = data.head_img;
          this.userData = data;
        })
        .catch((err) => console.log(err));
    },
    //回退到个人中心页；
    goBack() {
      //回去个人中心前，提醒个人中心父组件刷新渲染页面;
      this.$emit("reRender");
      this.$router.back();
    },
    //可以允许修改编辑
    edit() {
      this.isShow = true;
    },
    //获取当前子组件传入的组件是否显示的状态；
    getConditions(condition) {
      //再次渲染页面;
      this.renderPage();
      this.isShow = condition;
    },
    //上传文件；
    afterRead(fileObj) {
      // 此时可以自行将文件上传至服务器
      //文件存在在file文件对象中的file中;
      console.log(fileObj);
      let formdata = new FormData();
      // //添加图片到formata中，进行二进制编译;
      formdata.append("file", fileObj.file);

      /*async 改写axios*/

      let _this = this;
      async function sendReq(param) {
        const backdata = await _this.$axios({
          url: "/upload/",
          method: "post",
          data: formdata,
        });

        const backdata2 = await _this.$axios({
          url: "/user_update/" + localStorage.getItem("id"),
          method: "post",
          data: { head_img: backdata.data.data.url },
        });
        return backdata2;
      }
      sendReq().then((res) => {
        console.log(res);
        this.srcImg = "http://itluoshuai.cn:3000" + res.data.data.head_img;
        this.renderPage();
      });

      //原来的axios用法；
      // this.$axios({
      //   url: "/upload/",
      //   method: "post",
      //   data: formdata,
      // })
      // .then((res) => {
      //   // console.log(res.data.data.url);
      //   //提交编辑好的数据，发送ajax请求；
      // this.$axios({
      //   url: "/user_update/" + localStorage.getItem("id"),
      //   method: "post",
      //   data: {
      //     head_img: res.data.data.url,
      //   },
      // })
      //   .then((res) => {
      //     // 修改完毕, 刷新数据
      //     // console.log(res);
      //     this.srcImg = "http://127.0.0.1:3000" + res.data.data.head_img;
      //     // console.log(this.srcImg);
      //     this.renderPage();
      //   })
      //   //   .catch((err) => console.log(err));
      // })
      // .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped lang='scss'>
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  z-index: 999;
  .personalMsg {
    width: 90vw;
    height: 156vw;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: url("../../assets/images/webp.jpg") -48px -202px;
    ::v-deep .van-uploader {
      left: 39vw !important;
      z-index: 999;
      opacity: 0;
    }
    .msg {
      width: 100vw;
      height: 50vw;
      border-bottom: 2px solid #b18369;
      .title {
        width: 100vw;
        height: 20vw;
        line-height: 20vw;
        font-weight: bold;
        text-align: center;
        position: relative;
        i {
          width: 10vw;
          position: absolute;
          left: 4vw;
        }
      }
      .profile {
        position: relative;
        .image {
          position: absolute;
          width: 30vw;
          height: 30vw;
          top: -3vw;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
          overflow: hidden;
          .cat {
            width: 30vw;
            height: 30vw;
            object-fit: cover;
          }
        }
      }
    }
    .box {
      width: 90vw;
    }
    .button {
      width: 20vw;
      height: 10vw;
      line-height: 10vw;
      text-align: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 4vw;
      border: 2px solid #b18369;
      border-radius: 10px;
    }
  }
}
</style>