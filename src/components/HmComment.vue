<template>
  <div class="hm-comment">
      <div class="title">
          <img :src="$axios.defaults.baseURL + comment.user.head_img" alt="">
          <div class="info">
              <div class="name">{{comment.user.nickname}}</div>
              <div class="time">{{comment.create_date | time('YYYY-MM-DD HH:mm:ss')}}</div>
          </div>
          <div class="replay" @click="reply(comment.id)">回复</div>
      </div>
      <!-- 渲染楼层数据 -->
      <!-- 如果评论中有parent，我们就渲染楼层数据 -->
      <hm-floor :index ="index" v-if="comment.parent" :comment="comment.parent" @reply="reply"></hm-floor>
      <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
import HmFloor from '../components/HmFloor'
// 需要确定评论楼层的数字
export default {
  data () {
    return {
      index: this.getCommentLength(0, this.comment)
    }
  },
  methods: {
    //   计算comment中parent的层级
    getCommentLength (num, comment) {
      if (comment.parent) {
        return this.getCommentLength(num + 1, comment.parent)
      } else {
        return num
      }
    },
    reply (id) {
      console.log('pinglun', id)
      this.$emit('reply', id)
    }
  },
  components: {
    HmFloor
  },
  props: {
    comment: Object
  }
}
</script>

<style lang="scss" scoped>
.hm-comment{
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .title{
        display: flex;
        margin-bottom: 10px;
        img{
            width: 35px;
            height: 35px;
            object-fit: cover;
            border-radius: 50%;
        }
        .info{
            flex: 1;
            padding-left: 10px;
            .name{
                font-size: 14px;
            }
            .time{
                color: #888;
            }
        }
    }
    .content{
        font-size: 14px;
        padding: 10px 0;
    }
}
</style>
