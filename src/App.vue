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
    <router-view name="home"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang='scss'>
// button {
//   width: 20vw;
// }
</style>