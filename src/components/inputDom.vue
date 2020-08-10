<template>
  <div>
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="inputVal"
      :rules="rules"
      :class="[errMsg? 'err': '']"
      @change="judge"
    />
  </div>
</template>

<script>
import loginVue from "../views/login.vue";
export default {
  data() {
    return {
      inputVal: "",
      errMsg: false,
    };
  },
  props: ["type", "placeholder", "rules", "notAllowed"],
  watch: {
    inputVal() {
      //若是输入框为空，则恢复样式;
      if (this.inputVal == "") {
        this.errMsg = false;
      }
      this.$emit("inputData", this.inputVal);
    },
  },
  methods: {
    judge() {
      //输入框为空时
      if (this.inputVal == "") {
        return;
      }
      //验证用户输入的正则表达
      if (this.rules.test(this.inputVal)) {
        this.errMsg = false;
        // console.log(this.userName);
      } else {
        this.errMsg = true;
        // console.log(this.objData.password);
      }
      //若是验证有误，则弹窗；
      if (this.errMsg) {
        this.$dialog
          .alert({
            title: "输错了亿点点~",
            message: this.notAllowed,
            theme: "round-button",
          })
          .then(() => {
            // on close
          });
      }
    },
  },
  components: {},
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