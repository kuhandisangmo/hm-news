<template>
  <div class="info-title" @click="this.$router.go(-1)">
      <div class="left"><i class="iconfont iconjiantou2"></i></div>
     <div class="text"><slot></slot></div>
     <div class="right"></div>
    </div>
</template>

<style lang="scss" scoped>
.info-title{
    display: flex;
    margin-top: 5px;
    .left,.right{
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
  .text{
    flex: 1;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
  }
  }
</style>
