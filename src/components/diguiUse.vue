<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <p>{{item.name}}</p>
        <menus v-if="item.children" :list="item.children"></menus>
      </li>
      <!-- <ul v-if="item.children">
      </ul>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: "menus",
  props: ["list"],
  data() {
    return {};
  },
  //   components: {
  //     list,
  //   },
};
</script>

<style scoped lang='scss'>
ul {
  padding-left: 30px !important;
}
</style>