<template>
  <div class="info-title">
      <div class="left"><i class="iconfont iconjiantou2"></i></div>
     <div class="text"><slot></slot></div>
    </div>
</template>

<style lang="scss" scoped>
.info-title{
    display: flex;
    padding: 20px;
    .left{
      width: 30px;
      height: 30px;
      line-height: 30px;
    }
  .text{
    flex: 1;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
  }
  }
</style>
