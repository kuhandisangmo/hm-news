<template>
  <div class="focus">
    <info-title>我的关注</info-title>
   <!-- 关注的内容 -->
    <div class="focus-content" v-for="item in followList" :key="item.id">
      <!-- 头像 -->
      <div class="left">
        <img :src="$axios.defaults.baseURL + item.head_img" alt="">
      </div>
      <!-- 标题 -->
      <div class="middle">
        <p>{{item.nickname}}</p>
        <p>{{item.create_date | time}}</p>
      </div>
      <!-- 关注与否 -->
      <div class="right" @click="unfollow(item.id)">
        <span>取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      followList: []
    }
  },
  created () {
    this.getFollowList()
  },
  methods: {
    async getFollowList () {
      const res = await this.$axios.get(`/user_follows`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.followList = data
      }
    },
    async unfollow (id) {
      // 给用户一个确认框
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '你确定要取消关注么'
        })
        // 发送请求，取消关注的用户
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        // console.log(res)
        const { statusCode } = res.data
        if (statusCode === 200) {
          this.$toast.success('取关成功')
          // 重新发送请求获取用户列表
          this.getFollowList()
        }
      } catch {
        this.$toast('取消操作')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.focus-content{
    display: flex;
    height: 60px;
    padding: 5px 20px;
    border-bottom: 1px solid #ccc;
    align-items: center;
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
      font-size: 18px;
      color: #000;
      p:last-child{
        font-size: 14px;
        color: #999;
      }
    }
    .right{
      font-size: 10px;
      width: 73px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 15px;
      background-color: #ccc;
      color: #000;
      // margin-top: 10px;
    }
  }
</style>
