<template>
<!-- 递归渲染hm-floor组件 -->
<div class="wrapper">
  <hm-floor :index = "index-1" v-if="comment.parent" :comment="comment.parent" @reply="reply"></hm-floor>
  <div class="hm-floor">
      <div class="title">
          <div class="name">{{index}}楼 {{comment.user.nickname}}</div>
          <div class="time">{{comment.create_date | time('YYYY-MM-DD HH:mm:ss')}}</div>
          <div class="reply" @click="reply(comment.id)">回复</div>
      </div>
      <div class="content">{{comment.content}}</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    comment: Object,
    index: Number
  },
  methods: {
    reply (id) {
      console.log(id)
      this.$emit('reply', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-floor{
    border: 1px solid #ccc;
    background-color: #ddd;
    padding: 10px;
    .title{
        display: flex;
        align-items: flex-end;
        padding-bottom: 10px;
        .name{
            font-size: 14px;
        }
        .time{
            flex: 1;
            margin-left: 10px;
        }
    }
    .content{
        font-size: 14px;
    }
}
</style>
