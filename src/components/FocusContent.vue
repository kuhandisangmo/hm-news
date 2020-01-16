<template>
  <!-- 关注的内容 -->
    <div class="focus-content">
      <!-- 头像 -->
      <div class="left">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579188956743&di=701e8cc3a134382c4c193db428ba723c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201710%2F06%2F20171006195658_aCMeB.thumb.700_0.jpeg" alt="">
      </div>
      <!-- 标题 -->
      <div class="middle">
        <p>火星新闻播报</p>
        <p>2020-1-16</p>
      </div>
      <!-- 关注与否 -->
      <div class="right">
        <span>取消关注</span>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.focus-content{
    display: flex;
    height: 60px;
    padding: 5px 20px;
    border-bottom: 1px solid #ccc;
    .left{
      width: 40px;
      height: 40px;
      background-color: #666;
      // border-radius: 50%
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%
      }
    }
    .middle{
      flex: 1;
      padding-left: 10px;
      font-size: 16px;
      color: #000;
      p:last-child{
        font-size: 14px;
        color: #999;
      }
    }
    .right{
      width: 73px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 15px;
      background-color: #ccc;
      color: #000;
      margin-top: 10px;
    }
  }
</style>
