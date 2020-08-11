<template>
  <div class="pop-up" v-show="isShow">
    <van-cell-group>
      <van-field v-model="newData.nickname" label="昵称" class="nickname" />

      <van-field v-model="newData.password" type="password" label="密码" class="psd" />
      <van-radio-group v-model="radio" class="radio">
        <van-radio name="1" checked-color="#07c160" class="op1">男</van-radio>
        <van-radio name="2" checked-color="#07c160" class="op2">女</van-radio>
      </van-radio-group>
    </van-cell-group>
    <div class="buttons">
      <span class="del" @click="del">取消</span>
      <span class="sure" @click="sure">确定修改</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //保存输入框组件的内容
      newData: {
        nickname: "",
        password: "",
        gender: "",
        // editHeadImg: "",
      },
      radio: "",
      userData: {},
      //弹窗是否展示
      isShow: true,
    };
  },
  mounted() {
    //一进来页面首先加载已经编辑好的数据;
    this.renderPage();
  },

  methods: {
    renderPage() {
      this.$axios({
        url: "user/" + localStorage.getItem("id"),
        params: localStorage.getItem("id"),
        headers: {
          //Bearer写在前面
          Authorization: "Bearer " + localStorage.getItem("Authorization"),
        },
      })
        .then((res) => {
          //渲染数据到页面；
          this.userData = res.data.data;
          this.newData.nickname = this.userData.nickname;
          this.newData.username = this.userData.username;
          this.newData.password = this.userData.password;
          //这里radio不包含在提交的数据中，只在渲染中需要；
          this.radio = this.userData.gender == 1 ? "1" : "2";
        })
        .catch((err) => console.log(err));
    },
    del() {
      this.isShow = false;
      this.$emit("popUp", this.isShow);
    },
    sure() {
      //提交编辑好的数据，发送axios请求；
      //   this.isShow = true;
      // console.log(this.editHeadImg);
      this.newData.gender = this.radio == "1" ? 1 : 0;
      this.$axios({
        url: "/user_update/" + localStorage.getItem("id"),
        method: "post",
        data: this.newData,
      })
        .then((res) => {
          console.log(res);
          // 修改完毕, 刷新数据
          this.renderPage();
          this.isShow = false;
          this.$emit("popUp", this.isShow);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped lang='scss'>
.pop-up {
  width: 80vw;
  height: 75vw;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border: 2px solid #b18369;
  background: #f7f8f2;
  .van-field__control {
    color: red !important;
  }
  .nickname {
    height: 18vw;
    line-height: 18vw;
    border-bottom: 1px solid #ccc;
  }

  .psd {
    height: 18vw;
    line-height: 18vw;
    border-bottom: 1px solid #ccc;
  }
  .radio {
    height: 20vw;
    .op1 {
      height: 10vw;
    }
    .op2 {
      height: 10vw;
    }
  }
  .buttons {
    text-align: center;
    width: 80vw;
    height: 12vw;

    span {
      display: inline-block;
      border-radius: 10px;
      border: 1px solid #b18369;
      margin-top: 4vw;
      background: #f2d1b9;
    }
    .del {
      margin-right: 4vw;
      width: 12vw;
    }
    .sure {
      width: 22vw;
    }
  }
}
</style>