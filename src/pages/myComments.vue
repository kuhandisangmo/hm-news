<template>
  <div class="my-comments" >
      <info-title>我的跟帖</info-title>
      <!--
          v-model="loading" loading用于指定当前加载状态，是一个布尔值，如果为true，就是正在加载，为false就是加载完成
          finished:用于指定是否在家完成   如果没有更多数据了，那就算加载完成，如果finished为true代表数据全部加载完成，不会再触发加载时间
          finished-text：用于指定加载完成的文本信息
          onLoad事件：每次滚动到最底部就会触发load事件
          immediate-check关闭页面加载立即触发load事件
       -->
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
          :offset="50"
        >
      <!-- 跟帖的数据 -->
      <div class="item" v-for="item in commentsList" :key="item.id">
      <div class="time">{{item.create_date | time('YYYY-MM-DD HH:mm')}}</div>
      <!-- 父级跟帖数据 -->
      <div class="parent" v-if="item.parent">
          <p>回复：{{item.parent.user.nickname}}</p>
          <p>{{item.parent.content}}</p>
      </div>
      <div class="content">{{item.content}}</div>
      <div class="origin">
          <span class="one-txt-cut">原文：{{item.post.title}}</span>
          <span class="iconfont iconjiantou1"></span>
      </div>
      </div>

      </van-list>

  </div>
</template>

<script>
export default {
  data () {
    return {
      // 跟帖列表
      commentsList: [],
      // 当前页
      pageIndex: 1,
      // 每页条数
      pageSize: 4,
      // 指定加载状态
      loading: false,
      // 是否加载完成
      finished: false
    }
  },
  created () {
    this.getCommentsList()
  },
  methods: {
    //   获取跟帖数据
    async getCommentsList () {
      // pageIndex:用于指定当前页
      // pageSize:用于指定每页条数
      const res = await this.$axios.get(`/user_comments`, {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      //   console.log(res)

      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // 吧data中所有数据拼接到commenslist中
        this.commentsList = [...this.commentsList, ...data]
      }
      console.log(this.commentsList)
      //   当数据加载完成，需要把loading重新改成false，这样才能触发下一个加载数据
      this.loading = false
      // 如果没有更多数据了，需要把finished改成true，就不会继续触发了
      if (data.length < this.pageSize) {
        // 没有更多数据了
        this.finished = true
      }
    },
    // 分页
    onLoad () {
      console.log('到底了,需要加载更多数据')
      // 让pageindex+1,重新发送ajax请求
      this.pageIndex++
      // 重新发送请求家在数据
      this.getCommentsList()
    }
  }
}
</script>

<style lang="scss" scoped>
.my-comments{
    padding-top: 45px;
    .info-title{
        width: 100%;
        position: fixed;
        top: -5px;
        background-color: #fff;
    }
    .item{
    padding: 10px;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    line-height: 30px;
    .content{
        color: #000;
    }
    .time{
        color:#888;
    }
    .origin{
        color:#888;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        .one-txt-cut{
            flex:1;
        }
    }
    .parent{
        margin: 10px 0;
        background-color: #ddd;
        padding: 10px;
        border-radius: 5px;
        p:first-child{
            font-size: 12px
        }
    }
    }
}
</style>
