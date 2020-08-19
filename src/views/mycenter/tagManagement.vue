<template>
  <div class="bg">
    <div class="tag_management">
      <header>
        <i class="iconfont iconjiantou2" @click="$router.back()"></i>
        栏目管理
      </header>
      <div class="delChannal channel">
        <p>点击删除以下频道</p>
        <span
          v-for="(item, index) in ownedChannelLists"
          :key="index"
          @click="delChannel(index)"
        >{{item.name}}</span>
      </div>
      <div class="addChannel channel">
        <p>点击添加以下频道</p>
        <span
          v-for="(item, index) in addChannelLists"
          :key="index"
          @click="addChannel(index)"
        >{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //已有的频道；
      ownedChannelLists: [],
      //想添加的频道
      addChannelLists: [],
    };
  },
  watch: {
    ownedChannelLists() {
      //将栏目存放到本地储存,监听栏目的变化；
      console.log(this.ownedChannelLists);
      localStorage.setItem(
        "ownedChannels",
        JSON.stringify(this.ownedChannelLists)
      );
    },
    addChannelLists() {
      console.log(this.addChannelLists);
      localStorage.setItem("addChannels", JSON.stringify(this.addChannelLists));
    },
  },
  created() {
    //进入页面查找本地是否有频道的数据，有则优先渲染数据;
    if (
      localStorage.getItem("ownedChannels") &&
      localStorage.getItem("addChannels")
    ) {
      this.ownedChannelLists = JSON.parse(
        localStorage.getItem("ownedChannels")
      );
      this.addChannelLists = JSON.parse(localStorage.getItem("addChannels"));
    } else {
      //发送栏目数据请求;
      this.$axios({
        url: "/category",
      }).then((res) => {
        console.log(res);
        this.ownedChannelLists = res.data.data;
      });
    }
  },
  methods: {
    //删除频道的方法
    delChannel(tabIndex) {
      //删除频道是从本地列表中删除;
      //删除前放到添加的数组列表中;
      //若是只剩下一个频道则不可删除;
      if (this.ownedChannelLists.length == 1) {
        return;
      }
      this.addChannelLists.push(this.ownedChannelLists[tabIndex]);
      this.ownedChannelLists.splice(tabIndex, 1);
    },
    addChannel(tabIndex) {
      this.ownedChannelLists.push(this.addChannelLists[tabIndex]);
      this.addChannelLists.splice(tabIndex, 1);
    },
  },
};
</script>

<style scoped lang='scss'>
.bg {
  width: 100vw;
  height: 222vw;
  background: url("../../assets/images/webp.jpg") left bottom;
  .tag_management {
    padding: 4vw;
    header {
      width: 100%;
      height: 20vw;
      line-height: 20vw;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      position: relative;
      i {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .channel {
      margin: 6vw 0;
      p {
        color: #666;
        margin-bottom: 4vw;
      }
      span {
        display: inline-block;
        width: 18vw;
        height: 12vw;
        border: 1px solid #333;
        border-radius: 15px;
        margin-right: 2vw;
        margin-top: 4vw;
        text-align: center;
        line-height: 12vw;
        font-weight: bold;
      }
    }
  }
}
</style>


