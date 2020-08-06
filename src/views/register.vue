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
      <inputDom :type="'text'" :placeholder="'番号？'"></inputDom>
      <inputDom :type="'text'" :placeholder="'ニックネーム'"></inputDom>
      <inputDom :type="'password'" :placeholder="'パスワード？'"></inputDom>
    </form>
    <div class="loginBtn">
      <!-- <input type="button" value="ฅ'ω'ฅ♪(ロ)" /> -->
      <transition mode="out-in" enter-active-class="animate__animated animate__slideInUp">
        <a type="button">ฅ'ω'ฅ♪(登)</a>
      </transition>
    </div>
  </div>
</template>

<script>
import register from "../components/inputDom";
export default {
  components: {
    register,
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