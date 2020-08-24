<template id='sumbitBtn'>
  <div class="sumbitBtn">
    <a :href="href" @click="sendData">{{btnName}}</a>
  </div>
</template>

<script>
export default {
  props: ["href", "btnName", "userName", "password", "userNickName"],
  methods: {
    sendData() {
      if (this.userName == "" || this.password == "") {
        console.log("hihihihi");
        // this.$dialog
        //   .alert({
        //     message: "ユーザー名あるいはパスワードは空じゃだめよ～",
        //     theme: "round-button",
        //   })
        //   .then((res) => {
        //     console.log(res);
        //   });
        this.$toast.fail("入力は空じゃだめよ～");
        return;
      }
      this.$emit("isClicked");
    },
    // sendClick() {
    //   console.log(this.userName, this.password, this.userNickName);

    // },
  },
};
</script>

<style scoped lang='scss'>
.sumbitBtn {
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
</style>
