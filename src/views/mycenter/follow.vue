<template>
  <div>
    <button @click="addFriends(4)">点我添加好友</button>
    <div class="diguiTest">
      <digui :list="list"></digui>
    </div>
  </div>
</template>

<script>
import { log } from "util";
import digui from "../../components/diguiUse";
export default {
  components: {
    digui,
  },
  mounted() {
    // this.$axios({
    //   url: "/post_comment/1",
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));

    this.$axios({
      url: "/user_comments",
    })
      .then((res) => {
        console.log(res.data.data);
        this.commentList = res.data.data;
      })
      .catch((err) => console.log(err));
  },
  data() {
    return {
      list: [
        {
          name: "一级菜单",
          children: [
            {
              name: "二级菜单1",
              children: [
                {
                  name: "虾饺",
                },
                {
                  name: "干蒸",
                },
              ],
            },
            {
              name: "二级菜单2",
              children: [
                {
                  name: "咖啡",
                },
                {
                  name: "奶茶",
                },
              ],
            },
          ],
        },
      ],
      commentList: [],
    };
  },
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

<style scoped >
</style>
