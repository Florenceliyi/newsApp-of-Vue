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
    <router-view name="personCenter"></router-view>
    <router-view name="personalMsg"></router-view>
    <router-view name="myFollowers"></router-view>
    <router-view name="follow"></router-view>
    <router-view name="newsDetail"></router-view>
    <router-view name="videoDes"></router-view>
    <router-view name="myCollection"></router-view>
    <router-view name="lists"></router-view>
    <router-view name="myComments"></router-view>
    <router-view name="moreComments"></router-view>
    <router-view name="search"></router-view>
    <router-view name="tagManagement"></router-view>
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
div {
  position: relative;
}
</style>