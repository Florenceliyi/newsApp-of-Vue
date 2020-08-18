<template id='home'>
  <div class="home">
    <div class="pre-header">
      <!-- 头部 -->
      <div class="header">
        <a href="#" class="logo"></a>
        <div class="search">
          <i class="iconfont iconsearch"></i>
          <input type="text" placeholder="搜索新闻" @focus="$router.push('/search')" />
        </div>
        <a href="/#/mycenter" class="login iconfont iconwode"></a>
      </div>
      <!-- 新闻导航 -->
      <van-tabs sticky swipeable scroll v-model="tabIndex">
        <van-tab
          v-for="(item, index) in categoryLists"
          :title="item.name"
          :key="index"
          :to="'/?category='+index"
          sticky
          swipeable
          scroll
        >
          <!-- 4. 无限加载列表 -->
          <!-- load 滚动到底部时触发的加载事件, 需要自己写逻辑
        v-model 当前是否正在执行加载过程
        finished 当前的列表是否已经到底结束, 如果是的话, 这次请求结束后下一次不会再继续了
        immediate-check 禁止页面一进来就开始读取 false
          finished-text 页面拉到底的时候发出的提示-->
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="何もないよ～～"
            @load="getMorePages"
            :immediate-check="false"
            loading-text="ダウンロード中。。。"
          >
            <!-- 单图文章子组件 -->
            <onePieceNews
              v-for="(item, index) in categoryLists[tabIndex].postList"
              :key="index"
              :item="item"
            ></onePieceNews>
            <!-- 多图文章子组件 -->
            <twoPiecesNews
              v-for="(item, index) in categoryLists[tabIndex].postList"
              :key="index + 1000 "
              :item="item"
            ></twoPiecesNews>
            <!-- 视频内容子组件 -->
            <videosNews
              v-for="(item, index) in categoryLists[tabIndex].postList"
              :key="index + 2000"
              :item="item"
            ></videosNews>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// import { Tab, Tabs } from "vant";
import onePieceNews from "../components/onePieceNews";
import twoPiecesNews from "../components/twopiecesNews";
import videosNews from "../components/videosNews";
import axios from "axios";
import { log } from "util";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      //导航栏默认选中的对应索引内容；
      tabIndex: Number(this.$route.query.category) || 0,
      //导航栏列表
      categoryLists: [],
    };
  },
  components: {
    onePieceNews,
    twoPiecesNews,
    videosNews,
  },
  computed: {
    //实现点击，将当前tab栏选项id放入数组中的功能;
    getActiveId() {
      const currentCategory = this.categoryLists[this.tabIndex];
      return currentCategory.id;
    },
  },
  watch: {
    tabIndex(index) {
      // console.log(index);
      const currentCategory = this.categoryLists[this.tabIndex];
      //postList若有数据表明已经触发了滚动加载，此时不需要再强制重新加载，只有当为空时才需要重新渲染加载；
      console.log(currentCategory.postList);
      if (currentCategory.postList.length == 0) {
        console.log("没有数据，渲染页面");
        this.renderArticles();
      } else {
        console.log("有数据，不用渲染");
      }
    },
  },
  mounted() {
    //111111111111.进来页面渲染tab栏；
    this.renderTabLists();
  },
  methods: {
    renderArticles() {
      //2222222222222222.首先获取对应栏目的文章数据;
      const currentCategory = this.categoryLists[this.tabIndex];
      console.log(currentCategory);
      this.$axios({
        url: "/post",
        params: {
          pageIndex: currentCategory.pageIndex,
          category: this.getActiveId,
          pageSize: currentCategory.pageSize,
        },
      })
        .then((res) => {
          console.log(res.data.data);
          /*加载页面的逻辑，实现瀑布流的逻辑*/
          /*由于实现瀑布流需要拼接数组来制造加数据，需要在滚动到底部时，在postList中重新加入新的数据*/
          currentCategory.postList = [
            ...currentCategory.postList,
            ...res.data.data,
          ];
          // console.log(currentCategory);
          // console.log(currentCategory.postList);

          //33333333333333.3滚动默认调用vant插件，手动设置loading为false，表示加载结束；
          currentCategory.loading = false;
          //33333333333333.4  加载结束条件：当文章条数少于5条时，结束加载数据;
          if (res.data.data.length < currentCategory.pageSize) {
            currentCategory.finished = true;
          }
          console.log(this.categoryLists[this.tabIndex].postList);
        })
        .catch((err) => console.log(err));
    },
    renderTabLists() {
      //进来加载栏目列表信息;
      this.$axios({
        url: "/category",
      }).then((res) => {
        //11111111111.2将所有需要用到的数据包装成一个数组，方便后面渲染文章列表可以获取到
        const newLoadingData = res.data.data.map((item) => {
          //return返回一个修改包装后的新的数组，保存了vant瀑布流插件要用到的loading、finished属性；
          //postList用于拼接当前栏目的数据，后面需要多加载一页的加数据，拼接到这里;
          return {
            ...item,
            postList: [],
            pageIndex: 1,
            pageSize: 4,
            loading: false,
            finished: false,
          };
        });
        this.categoryLists = newLoadingData;

        //11111111111.3进来加载栏目完毕后，调用调用第0个返回数据的文章列表对象，渲染文章列表；
        this.renderArticles();
      });
    },
    getMorePages() {
      //333333333333333333.1    首先获取当前栏目对应的数据;
      //由于需要将页码设置多加1，需要拿到当前栏目的类别对象；
      const currentCategory = this.categoryLists[this.tabIndex];
      currentCategory.pageIndex += 1;
      //333333333333333333.2   设置延迟可以清楚看到懒加载现象；
      setTimeout(() => {
        this.renderArticles();
      }, 1000);
    },
  },
};
</script>

<style scoped lang='scss'>
input::-webkit-input-placeholder {
  color: #fff;
  //   font-size: 16px;
}
.home {
  // position: relative;
  overflow: hidden;
  background: #ffccd1;
  .pre-header {
    ::v-deep .header {
      // position: fixed;
      // top: 0;
      // z-index: 666;
      width: 100vw;
      height: 10vh;
      background: #f44236;
      padding: 2vw 4vw 2vw 0vw;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .logo {
        display: inline-block;
        width: 27vw;
        height: 7vh;
        background: url("../assets/images/logo.png") no-repeat center;
        background-size: cover;
        color: #fff;
        padding-left: 8vw;
      }
      .search {
        width: 45vw;
        height: 7vh;
        border-radius: 50%;
        position: relative;
        color: #fff;
        i {
          position: absolute;
          left: 9vw;
          top: 50%;
          transform: translateY(-50%);
        }
        input {
          width: 100%;
          height: 100%;
          background: #f97979;
          color: #fff;
          border-radius: 25px;
          padding-left: 14vw;
        }
      }

      .login {
        font-size: 30px;
        color: #fff;
      }
    }
    ::v-deep .van-tabs__wrap--scrollable .van-tab {
      padding: 0 34x;
    }
    ::v-deep .van-tabs__line {
      left: -1px;
    }
    ::v-deep .van-sticky--fixed {
      z-index: 9999;
    }
  }
}
</style>
