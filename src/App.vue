<template>
  <div>
    <!-- <router-link></router-link> -->
    <!-- <router-link tag="button" @click="toggle" to="/register">注册</router-link> -->
    <transition mode="out-in" appear enter-active-class="animate__animated animate__zoomInUp">
      <router-view name="login"></router-view>
    </transition>
    <transition mode="out-in" appear enter-active-class="animate__animated animate__zoomInUp">
      <router-view name="register"></router-view>
    </transition>
  </div>
</template>

<script>
import login from "./views/login";
// import register from "./views/register";
export default {
  data() {
    return {
      name: "login",
    };
  },
  methods: {
    // toggle() {
    //   this.name = this.name == "login" ? "register" : "login";
    // },
  },
};
</script>

<style lang='scss'>
// .v-enter {
//   opacity: 0;
// }

// .v-enter-to {
//   opacity: 1;
// }

// .v-enter-active {
//   transition: all 3s;
// }

// .v-leave {
//   opacity: 1;
// }

// .v-leave-to {
//   opacity: 0;
// }

// .v-leave-active {
//   transition: all 3s;
// }
// button {
//   width: 20vw;
// }
</style>