<template id='register'>
  <div class="login">
    <header>
      <a href="javascript:void(0)" class="close"></a>
    </header>
    <transition
      appear
      mode="out-in"
      enter-active-class="animate__animated animate__lightSpeedInLeft"
    >
      <div class="logo">
        <img src="../assets/images/webp.jpg" alt />
      </div>
    </transition>

    <form action>
      <!-- <input type="text" placeholder="番号？" />
      <input type="text" placeholder="ニックネーム？" />
      <input type="password" placeholder="パスワード？" />-->
      <inputDom
        :type="'text'"
        :placeholder="'番号？'"
        :rules="/[0-9a-zA-Z]/"
        notAllowed="不合法的用户名"
        @inputData="getUserName"
      ></inputDom>
      <inputDom
        :type="'text'"
        :placeholder="'ニックネーム'"
        :rules="/[0-9a-zA-Z]/"
        @inputData="getUserNickName"
      ></inputDom>
      <inputDom
        :type="'password'"
        :placeholder="'パスワード？'"
        :rules="/^\d{3,}$/"
        notAllowed="不合法的密码"
        @inputData="getUserPsw"
      ></inputDom>
    </form>
    <div class="loginBtn">
      <!-- <input type="button" value="ฅ'ω'ฅ♪(ロ)" /> -->
      <transition mode="out-in" enter-active-class="animate__animated animate__slideInUp">
        <!-- 提交按钮组件 -->
        <btn
          href="#"
          btnName="ฅ'ω'ฅ♪(登)"
          :userName="objData.userName"
          :userNickName="objData.userNickName"
          :password="objData.password"
          @isClicked="getUserData"
        ></btn>
        <!-- <a type="button">ฅ'ω'ฅ♪(登)</a> -->
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog } from "vant";
import inputDom from "../components/inputDom";
import btn from "../components/sumbitBtn";
export default {
  components: {
    inputDom,
    btn,
  },
  data() {
    return {
      objData: {
        userName: "",
        userNickName: "",
        password: "",
      },
    };
  },
  methods: {
    getUserName(userName) {
      this.objData.userName = userName;
    },
    getUserPsw(password) {
      this.objData.password = password;
    },
    getUserNickName(userNickName) {
      this.objData.userNickName = userNickName;
    },
    getUserData() {
      this.$axios({
        url: Vue.baseURL + "/register",
        method: "post",
        data: {
          username: this.objData.userName,
          password: this.objData.password,
          nickname: this.objData.userNickName,
        },
      })
        .then((res) => {
          if (res.data.message == "注册成功") {
            Dialog.alert({
              message: res.data.message,
              theme: "round-button",
            }).then(() => {
              // on close
            });
            location.href = "http://192.168.79.61:8081/#/login";
          } else {
            Dialog.alert({
              message: res.data.message,
              theme: "round-button",
            }).then(() => {
              // on close
            });
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped lang='scss' >
// @import "../assets/css/base.scss";
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #f7f8f2;
  input {
    width: 90vw;
    height: 10vh;
    margin-top: 2vh;
    border-radius: 5vm;
    border-radius: 10px;
    //   font-size: $fontSize;
  }
  header {
    .close {
      position: absolute;
      left: -4vw;
      top: 8vw;
      width: 23vw;
      height: 23vw;
    }
    .close:before,
    .close:after {
      position: absolute;
      left: 15vw;
      content: " ";
      height: 5vh;
      width: 2vw;
      background-color: #000;
    }
    .close:before {
      transform: rotate(45deg);
    }
    .close:after {
      transform: rotate(-45deg);
    }
  }
  form {
    position: absolute;
    top: 50vw;
    left: 50%;
    transform: translateX(-50%);
  }
  .logo {
    img {
      position: absolute;
      right: 0vw;
      width: 40vw;
      height: 40vh;
      text-align: center;
    }
  }
  .loginBtn {
    color: #fff;
    position: absolute;
    bottom: 5vh;
    left: 50%;
    transform: translateX(-50%);
    a {
      display: inline-block;
      width: 50vw;
      height: 8vh;
      line-height: 8vh;
      background: #f15620;
      color: #fff;
      border-radius: 10px;
      text-align: center;
      margin-top: 4vw;
    }
  }
}

/*叉号*/
</style>