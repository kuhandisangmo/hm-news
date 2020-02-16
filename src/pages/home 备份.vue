<template>
  <div class="home">
      <div class="header">
          <div class="logo iconfont iconnew"></div>
          <div class="search"><i class="iconfont iconsearch"></i>搜索新闻</div>
          <div class="person iconfont iconwode" @click="$router.push('/profile')"></div>
      </div>
      <!-- 导航栏 -->
      <van-tabs v-model="active" sticky animated swipeable>
        <van-tab v-for="item in navList" :key="item.id" :title="item.name">
          <!-- 下拉刷新 -->
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <!-- 分页 -->
            <van-list
              v-model="loading"
              :finished="item.finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="false"
              :offset="50"
            >
              <hm-article v-for="post in item.posts" :key="post.id"   :post="post"></hm-article>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 默认激活的tab栏
      active: localStorage.getItem('token') ? 1 : 0,
      // 所有tab栏分类数据
      navList: [],
      // list的加载状态
      loading: false,
      // 每页显示数据条数
      pageSize: 5,
      // 是否在刷新的状态
      refreshing: false

    }
  },
  async created () {
    await this.getHomeList()
    this.getPostList()
  },
  methods: {
    async getHomeList () {
      const res = await this.$axios.get(`/category`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        //   遍历data，给data里面对象每个添加一个posts属性
        data.forEach(item => {
          // 保证每一个tab有自己的文章列表
          item.posts = []
          // 保证每一个tab有自己的pageIndex
          item.pageIndex = 1
          // 保证每一个tab有自己的加载状态
          item.finished = false
        })
        this.navList = data
        // console.log(this.navList)
      }
    },
    // 用于加载分类对应的文章
    async getPostList () {
      // 需要传对应的id
      const id = this.navList[this.active].id
      const res = await this.$axios.get(`/post`, {
        params: {
          category: id,
          pageIndex: this.navList[this.active].pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.navList[this.active].posts = [...this.navList[this.active].posts, ...data]
      }
      console.log(this.navList[this.active].posts)
      // 需要把loading状态改为false，才能触发下一次加载
      this.loading = false
      setTimeout(() => {
        // 把下拉刷新的状态关闭
        this.refreshing = false
      }, 1000)
      // 判断获取数据的条数,小于要求条数说明每有更多的文章了
      if (data.length < this.pageSize) {
        this.navList[this.active].finished = true
      }
    },
    onLoad () {
      setTimeout(() => {
        console.log('加载新页面')
        if (this.navList[this.active].finished) {
          console.log('不执行了')
          return
        }
        // 页数增加
        this.navList[this.active].pageIndex++
        this.getPostList()
      }, 1000)
    },
    onRefresh () {
      console.log('刷新')
      // 重置数据，清空列表数据
      this.loading = true
      this.navList[this.active].pageIndex = 1
      this.navList[this.active].posts = []
      this.navList[this.active].finished = false
      this.getPostList()
    }
  },
  watch: {
    active (value) {
      this.loading = true
      console.log('value变了', value)
      // 当分类发生了改变，我们需要重新发送请求获取数据
      //   在切换分类的时候，先判断当前分类下是否有数据，如果有数据，就不需要发请求了
      if (this.navList[this.active].posts.length > 0) { return }
      this.getPostList(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
    .header{
        width: 100%;
        height: 50px;
        text-align: center;
        padding: 0 15px;
        display: flex;
        align-items: center;
        background-color: red;
        .logo{
            font-size: 50px;
            color: #fff;
            margin-right: 15px;
        }
        .search{
            color: #fff;
            font-size: 14px;
            height: 34px;
            flex: 1;
            line-height: 34px;
            border-radius: 17px;
            background-color: rgba(242, 242, 242, .5);
            i{
                font-size: 18px;
                margin-right: 5px;
            }
        }
        .person{
            font-size: 24px;
            color: #fff;
            margin-left: 25px;
        }
    }
}
</style>
