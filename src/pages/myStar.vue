<template>
  <div class="my-star">
      <info-title>我的收藏</info-title>
      <!-- 收藏内容 -->
      <hm-article v-for="item in starList" :key="item.id" :post="item"></hm-article>
  </div>
</template>

<script>
export default {
  data () {
    return {
      starList: []
    }
  },
  created () {
    this.getStarList()
  },
  methods: {
    async getStarList () {
      const res = await this.$axios.get(`/user_star`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        data.forEach(item => {
          item.comment_length = item.comments.length
        })
        this.starList = data
      }
      console.log(this.starList)
    }
  }
}
</script>
