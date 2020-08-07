<template>
  <div>
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="inputVal"
      :rules="rules"
      :class="[errMsg? 'err': '']"
    />
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      inputVal: "",
      errMsg: false,
    };
  },
  props: ["type", "placeholder", "rules"],
  watch: {
    inputVal() {
      if (this.rules.test(this.inputVal)) {
        this.errMsg = true;
        // console.log(this.userName);
      } else {
        this.errMsg = false;
        // console.log(this.objData.password);
      }
      this.$emit("inputData", this.inputVal);
    },
  },
  methods: {
    //   getUserData(){
    //   }
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
};
</script>

<style scoped lang='scss'>
input {
  width: 90vw;
  height: 10vh;
  margin-top: 2vh;
  border-radius: 5vm;
  border-radius: 10px;
  //   font-size: $fontSize;
}
.err {
  background: red;
}
</style>