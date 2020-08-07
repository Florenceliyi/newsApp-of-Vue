<template id='sumbitBtn'>
  <div class="sumbitBtn">
    <a :href="href" @click="sendClick">{{btnName}}</a>
  </div>
</template>

<script>
export default {
  props: ["href", "btnName", "userName", "password"],
  methods: {
    // sendData() {
    //   this.$emit("isClicked");
    // },
    sendClick() {
      console.log(this.userName, this.password);
    },
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
