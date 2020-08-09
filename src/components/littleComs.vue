<template>
  <div class="box" @click="sendClick" :data-id="id">
    <div class="title">{{content}}</div>
    <div class="users">
      {{detail}}
      <i class="iconfont iconjiantou1"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["content", "detail", "id"],
  methods: {
    sendClick() {
      this.$emit("sonIsClicked", this.id);
    },
  },
};
</script>

<style scoped lang='scss'>
.box {
  width: 100vw;
  height: 12vh;
  border-bottom: 2px solid #b18369;
  display: flex;
  align-items: center;
  padding: 0 5vw;
  .title {
    flex: 3;
  }
  .users {
    flex: 1.5;
    padding-left: 15vw;
    color: #333;
    font-size: 14px;
    position: relative;
    text-align: right;
    padding-right: 8vw;
    i {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 2vw;
    }
  }
}
</style>