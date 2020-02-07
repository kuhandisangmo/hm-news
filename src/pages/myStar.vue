<template>
  <div class="my-star">
      <info-title>我的收藏</info-title>
      <!-- 收藏内容 -->
      <div class="star" v-for="item in starList" :key="item.id">
          <div class="left">
              <p>{{item.title}}</p>
              <div class="follow">
                  <span>{{item.user.nickname}}</span>
                  <span>{{item.comments.length}}跟帖</span>
              </div>
          </div>
          <div class="right">
              <img :src="item.cover[0].url" alt="">
          </div>
      </div>
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
        this.starList = data
      }
      console.log(this.starList)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-star{
    .star{
        padding: 10px;
        display:flex;
        border-bottom: 1px solid #ccc;
        font-size: 16px;
        .left{
            flex: 1;
            p{
                margin-top: 4px;
            }
            .follow{
                margin-top: 10px;
                font-size: 13px;
                color: #868686;
                span:last-child{
                    margin-left: 15px;
                }
            }
        }
        .right{
            width: 121px;
            height: 75px;
            img{
                width: 100%;
                height: 100%;
            }
        }

    }
}
</style>
