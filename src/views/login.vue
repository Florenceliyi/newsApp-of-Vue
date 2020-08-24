<template id='login'>
  <div class="login">
    <header>
      <a href="/#/home" class="close"></a>
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
      <input type="password" placeholder="パスワード？" />-->
      <inputDom
        :type="'text'"
        :placeholder="'ユーザー名／番号'"
        @inputData="getUserName"
        :rules="/[0-9a-zA-Z]/"
        @isEmpty="isEmpty"
      ></inputDom>
      <inputDom
        :type="'password'"
        :placeholder="'パスワード'"
        @inputData="getUserPsw"
        :rules="/^\d{3,}$/"
      ></inputDom>
    </form>

    <!-- 提交按钮组件 -->
    <btn
      href="#"
      btnName="ฅ'ω'ฅ♪(ロ)"
      :userName="objData.userName"
      :password="objData.password"
      @isClicked="getUserData"
    ></btn>

    <a href="#/register" class="register">ฅ'ω'ฅ♪(登)</a>
  </div>
</template>

<script>
import Vue from "vue";
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
  watch: {
    objData: {
      handler: function (val) {
        //val返回一个监听所有objData属性中的对象;
        console.log(val);
        if (val.username == "") {
        } else if (val.password == "") {
        }
      },
      /* deep属性可以监听多重嵌套的数据 */
      deep: true,
    },
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
    getUserData() {
      this.$axios({
        url: "/login",
        method: "post",
        data: {
          username: this.objData.userName,
          password: this.objData.password,
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.message == "登录成功") {
            this.$dialog.alert({
              message: res.data.message,
              theme: "round-button",
            });
            //可以用解构赋值语法简化：const {token, id} = res.data

            localStorage.setItem("Authorization", res.data.data.token);

            localStorage.setItem("id", res.data.data.user.id);
            // console.log(Vue.prototype.$axios.defaults.headers);
            //跳转到个人中心页
            this.$router.replace("/mycenter");
          } else {
            this.$dialog
              .alert({
                message: res.data.message,
                theme: "round-button",
              })
              .then(() => {
                // on close
              });
          }
        })
        .catch((err) => console.log(err));
    },
    isEmpty(isEmpty) {
      this.$dialog
        .alert({
          message: "ユーザー名あるいはパスワードは空じゃだめよ～",
          theme: "round-button",
        })
        .then((res) => {
          console.log(res);
        });
    },
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