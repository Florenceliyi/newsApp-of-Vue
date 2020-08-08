<template id='twopiecesNews'>
  <div class="news-content">
    <div class="title"></div>
    <div class="images">
      <img src="../assets/images/coffee.jpg" alt />
      <img src="../assets/images/coffee.jpg" alt />
      <img src="../assets/images/coffee.jpg" alt />
    </div>
    <div class="source">
      <span>火星时报</span>
      <span>52跟帖</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='scss'>
.news-content {
  width: 100vw;
  height: 25vh;
  padding: 3vh 3vw 4vh 3vw;
  background: #ffebed;
  border-bottom: 1px solid #ccc;
  .title {
    width: 70vw;
  }
  .images {
    display: flex;
    img {
      width: 30vw;
      height: 14vh;
      margin-right: 1vw;
      margin-bottom: 2vh;
    }
  }
  .source {
    span {
      font-size: 14px;
      margin-right: 2vw;
      color: #666;
    }
  }
}
</style>