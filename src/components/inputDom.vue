<template>
  <div>
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="inputVal"
      @change="test"
      @input="rollback"
      :class="[errMsg? 'err': '']"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputVal: "",
      errMsg: false,
    };
  },
  props: ["type", "placeholder"],
  methods: {
    test() {
      if (this.type == "text") {
        if (!/[0-9a-zA-Z]/.test(this.inputval)) {
          alert("输入有误");
          this.errMsg = true;
        }
      } else if (this.type == "password") {
        if (!/^[a-zA-Z]\w{5,* }$/.test(this.inputval)) {
          alert("输入有误");
          this.errMsg = true;
        }
      }
    },
    rollback() {
      this.errMsg = false;
    },
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