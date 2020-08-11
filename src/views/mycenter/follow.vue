<template>
  <div>
    <button @click="addFriends(4)">点我添加好友</button>
  </div>
</template>

<script>
import { log } from "util";
export default {
  methods: {
    addFriends(id) {
      this.$axios({
        url: "/user_follows/" + id,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
</style>
