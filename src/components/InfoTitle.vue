<template>
  <div class="info-title">
      <div class="left" @click="$router.back()"><i class="iconfont iconjiantou2"></i></div>
     <div class="text"><slot></slot></div>
     <div class="right"></div>
    </div>
</template>

<style lang="scss" scoped>
.info-title{
    display: flex;
    margin-top: 5px;
    border-bottom: 1px solid #ccc;
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
