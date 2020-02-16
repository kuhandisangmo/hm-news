<template>
  <div class="search">
      <div class="header">
          <div class="left" @click="back">
              <i class="iconfont iconjiantou2"></i>
          </div>
          <div class="middle">
              <i class="iconfont iconsearch"></i>
              <input type="text" placeholder="请输入关键字" v-model="keyword">
          </div>
          <div class="right" @click="search">搜索</div>
      </div>
      <div class="post-list" v-if="postList.length >0">
          <hm-article v-for="item in postList" :key="item.id" :post="item"></hm-article>
      </div>
      <div class="content" v-else>
          <h3>历史记录</h3>
          <div class="list" v-for="item in history" :key="item" @click="hotsearch(item)">{{item}}</div>
          <h3>热门搜索</h3>
          <div class="hot" v-for="item in hotkey" :key="item" @click="hotsearch(item)">{{item}}</div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: '',
      // 存放搜索数据
      postList: [],
      //   热搜
      hotkey: ['关晓彤', '说好不哭', '性感', '王祖贤'],
      //   历史记录
      history: JSON.parse(localStorage.getItem('history')) || []
    }
  },
  methods: {
    async search () {
      const res = await this.$axios.get(`/post_search`, {
        params: { keyword: this.keyword }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postList = data
        // 吧搜索的关键字存入历史记录中
        // 若有重复的，现将老的数据删掉，在添加进去
        this.history = this.history.filter(item => item !== this.keyword)
        this.history.unshift(this.keyword)
        // 吧history存到localstory中
        localStorage.setItem('history', JSON.stringify(this.history))
      }
    },
    hotsearch (item) {
      this.keyword = item
      this.search()
    },
    back () {
      if (this.keyword) {
        this.keyword = ''
      } else {
        this.$router.back()
      }
    }
  },
  watch: {
    keyword (value) {
      if (value === '') {
        this.postList = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
    .header{
        display: flex;
        // width: 100%;
        height: 50px;
        align-items: center;
        border-bottom: 1px solid #ccc;
        .left,.right{
            width: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 12px;
        }
        .middle{
            flex: 1;
            margin: 0 5px;
            border: 1px solid #ccc;
            border-radius: 25px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            input{
                flex: 1;
                height: 28px;background-color: #f7f7f7;
                margin-left: 5px;
                font-size: 12px;
            }
        }
    }
    .content{
        padding: 20px;
        h3{
            font-size: 18px;
            font-weight: 700;
        }
        .list{
            height: 30px;
            line-height: 30px;
            border-bottom: 1px solid #ccc;
            font-size: 14px;
        }
        .hot{
            height: 30px;
            line-height: 30px;
            font-size: 14px;
        }
    }
}
</style>
