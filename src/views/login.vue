<template id='login'>
  <div class="login">
    <header>
      <a href="javascript:void(0)" class="close"></a>
    </header>
    <div class="logo">
      <img src="../assets/images/webp.jpg" alt />
    </div>
    <form action>
      <!-- <input type="text" placeholder="番号？" />
      <input type="password" placeholder="パスワード？" />-->
      <inputDom
        :type="'text'"
        :placeholder="'ユーザー名／番号'"
        @inputData="getUserName"
        :rules="/^[a-zA-Z][a-zA-Z0-9_]{4,* }$/"
      ></inputDom>
      <inputDom
        :type="'password'"
        :placeholder="'パスワード'"
        @inputData="getUserPsw"
        :rules="/^[a-zA-Z]\w{5,* }$/"
      ></inputDom>
    </form>

    <!-- 提交按钮组件 -->
    <btn href="#" btnName="ฅ'ω'ฅ♪(ロ)" :userName="objData.userName" :password="objData.password"></btn>

    <a href="#/register" class="register">ฅ'ω'ฅ♪(登)</a>
  </div>
</template>

<script>
import inputDom from "../components/inputDom";
import btn from "../components/sumbitBtn";

export default {
  data() {
    return {
      userData: "",
      objData: {
        userName: "",
        password: "",
      },
    };
  },
  props: ["parentData"],
  methods: {
    getUserName(userName) {
      this.objData.userName = userName;
    },
    getUserPsw(password) {
      this.objData.password = password;
    },
    //若是父组件发送数据，则调用这里的方法；
    // getUserData() {
    //   console.log("拿到了用户名" + this.objData.userName);
    //   console.log("拿到了密码" + this.objData.password);
    // },
    // fn() {
    //   console.log(this.objData);
    // },
  },

  components: {
    inputDom,
    btn,
  },
};
</script>

<style scoped lang='scss'>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #f7f8f2;
  input {
    width: 90vw;
    height: 10vh;
    margin-top: 5vh;
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

  .register {
    position: absolute;
    bottom: 15vh;
    left: 50%;
    transform: translateX(-50%);
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

/*叉号*/
</style>