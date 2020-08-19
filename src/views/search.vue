<template>
  <div class="bg">
    <div class="search">
      <header>
        <i class="iconfont iconjiantou2" @click="$router.back()"></i>
        <div class="search-content">
          <i class="iconfont iconsearch"></i>
          <input
            type="text"
            :placeholder="placeholder"
            v-model="inputVal"
            v-focus
            @focus="delKeywords"
          />
        </div>
        <a href="javascript:void(0)" @click="search">搜索</a>
      </header>
      <div class="history">
        <div class="history_title">
          <span class="title">历史记录</span>
          <span class="del" @click="delAllData">清空历史记录</span>
        </div>
        <div class="history_content">
          <span
            v-for="(keyword, index) in history"
            :key="index"
            @click="searchAgain(keyword)"
          >{{keyword}}</span>
        </div>
      </div>
      <div class="hot_topic">
        <div class="hot_search">热门搜索</div>
        <div class="keywords">
          <p>办公室小野否认解散</p>
          <p>月季分手就分手的</p>
        </div>
      </div>
    </div>
    <div class="post">
      <oneNews v-for="(item, index) in results" :key="index" :item="item"></oneNews>
      <fewNews v-for="(item, index) in results" :key="index + 10" :item="item"></fewNews>
      <videoNews v-for="(item, index) in results" :key="index + 20" :item="item"></videoNews>
    </div>
  </div>
</template>

<script>
import oneNews from "../components/onePieceNews";
import fewNews from "../components/twopiecesNews";
import videoNews from "../components/videosNews";
import { log } from "util";
export default {
  components: {
    oneNews,
    fewNews,
    videoNews,
  },
  mounted() {
    if (this.inputVal == "") {
      this.placeholder = "搜索新闻";
    }
    //进入页面加载历史记录;
    if (localStorage.getItem("history")) {
      //重新转换成数组
      this.history = JSON.parse(localStorage.getItem("history"));
      //取出数组最后一个值，渲染搜索结果页面；
      this.inputVal = history[history.length - 1];
      this.search();
    }
  },
  directives: {
    focus: {
      bind(el) {
        el.focus();
      },
    },
  },
  data() {
    return {
      //储存历史记录的数组；
      history: [],
      //输入框的双向绑定;
      inputVal: "",
      //搜索出来的文章数据;
      results: [],
      placeholder: "",
    };
  },
  watch: {
    //储存历史数据到本地
    history() {
      //本地储存的数据必须是字符串，数组需要转化成字符串
      localStorage.setItem("history", JSON.stringify(this.history));
      //若历史记录数组为空
    },
    //若是输入框为空时，写入输入框内容
    inputVal(val) {
      if (val == "") {
        this.placeholder = "搜索新闻";
        //清除已经搜索出来的历史记录;
        this.results = [];
      }
    },
  },
  methods: {
    //搜索文章
    search() {
      if (this.inputVal == null) {
        return;
      }
      this.$axios({
        url: "/post_search",
        params: {
          keyword: this.inputVal,
        },
      })
        .then((res) => {
          console.log(res);
          this.results = res.data.data;
          //若历史记录当中没有这个搜索结果并且
          //获取成功后将输入的结果储存到历史记录数组;
          if (res.status == 200 && this.history.indexOf(this.inputVal) == -1) {
            this.history.push(this.inputVal);
          }
        })
        .catch((err) => console.log(err));
    },
    //点击历史数据重新渲染搜索界面;
    searchAgain(keyword) {
      this.inputVal = keyword;
      this.search();
    },
    //点击清空按钮清空所有搜索记录;
    delAllData() {
      localStorage.removeItem("history");
      //清空渲染数据的历史数组；
      this.history = [];
    },
    //输入框聚焦，清空搜索框
    delKeywords() {
      this.inputVal = "";
    },
  },
};
</script>

<style scoped lang='scss'>
.bg {
  width: 100vw;
  height: 222vw;
  background: url("../assets/images/webp.jpg") left bottom;
  .search {
    width: 100%;
    padding: 2vw 4vw;
    header {
      width: 100%;
      height: 20vw;
      display: flex;
      align-items: center;
      .iconjiantou2 {
        font-size: 20px;
        font-weight: bold;
        margin-right: 5vw;
      }
      .search-content {
        width: 75%;
        position: relative;
        overflow: hidden;
        margin-right: 4vw;
        i {
          font-size: 20px;
          font-weight: bold;
          position: absolute;
          left: 2vw;
          top: 50%;
          transform: translateY(-50%);
        }
        input {
          padding-left: 8vw;
          width: 100%;
          height: 12vw;
          border-radius: 40px;
          background: #ea8073;
          color: #000;
        }
      }
      a {
        font-weight: bold;
        font-size: 18px;
      }
    }
    .history {
      width: 100%;
      padding: 3vw 0;
      border-bottom: 1px solid #ccc;
      .history_title {
        margin: 3vw 0;
        display: flex;
        justify-content: space-between;
        .title {
          font-size: 20px;
          font-weight: bold;
        }
        .del {
          width: 28vw;
          text-align: center;
          border: 1px solid #333;
          border-radius: 15px;
        }
      }
      .history_content {
        span {
          border: 1px solid #333;
          margin-right: 3vw;
          border-radius: 15px;
          padding: 1vw;
        }
      }
    }
    .hot_topic {
      width: 100%;
      padding: 3vw 0;
      .hot_search {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 4vw;
      }
      .keywords {
        display: flex;

        p {
          flex: 1;
        }
      }
    }
  }
}
</style>