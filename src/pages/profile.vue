<template>
  <div class="profile">
    <info-title>个人中心</info-title>
    <div class="user-info" @click="$router.push('/edit-profile')">
      <!-- 头像 -->
      <div class="avatar">
        <img :src="avater" alt="">
      </div>
      <!-- 信息 -->
      <div class="info">
        <p>
          <i v-if="profile.gender === 1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>
          <span>{{profile.nickname}}</span>
        </p>
        <p>{{profile.create_date | time}}</p>
      </div>
      <!-- 右箭头 -->
      <div class="icon">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <div class="list">
      <hm-nav name="我的关注" desc="关注的用户" @click="focus"></hm-nav>
      <hm-nav name="我的跟帖" desc="跟帖/回复" @click="$router.push('my-comments')"></hm-nav>
      <hm-nav name="我的收藏" desc="文章/视频" @click="$router.push('my-star')"></hm-nav>
      <hm-nav name="栏目管理" desc="自定义首页栏目" @click="$router.push('/tab-manager')"></hm-nav> <hm-nav name="设置" @click="$router.push('/edit-profile')"></hm-nav>
      <hm-nav name="退出登录" @click="logout"></hm-nav>
    </div>
  </div>
</template>

<script>
// 导入一张图片
import img from '../assets/01.jpg'
export default {
  data () {
    return {
      profile: {},
      loding: false
    }
  },
  async created () {
    const userId = localStorage.getItem('user_id')
    // console.log(this.id)
    const token = localStorage.getItem('token')
    const res = await this.$axios.get(`/user/${userId}`, { headers: {
      Authorization: token
    } })
    this.profile = res.data.data
    console.log(this.profile)
    this.loding = true
  },
  methods: {
    async logout () {
      // async与await await知会等成功的结果，如果promise失败了，会抛出异常
      // try..catch
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要退出本系统么？'
        })
        // 点击确定
        // 删除token
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        // 跳转到登录页
        this.$router.push('/login')
        // 给一个提示消息
        this.$toast.success('退出成功')
      } catch {
        this.$toast('操作取消')
      }
    },
    focus () {
      this.$router.push('/focus')
    }
  },
  computed: {
    avater () {
      if (this.profile.head_img) {
        return this.$axios.defaults.baseURL + this.profile.head_img
      } else {
        return img
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile{
  .user-info{
    padding: 20px;
    display:flex ;
    border-bottom: 6px solid #ccc;
    .avatar{
      width: 70px;
      height: 70px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .icon{
      width: 30px;
      i{
        line-height: 70px;
      }
    }
    .info{
      flex: 1;
      margin-left: 15px;
      font-size: 18px;
      p{
        height: 30px;
        line-height: 30px;
        color: #000;
      }
      p:last-child{
        font-size: 14px;
        color: #999;
        margin-top: 5px;
      }
      .iconxingbienan {
        color: rgb(171, 213, 242);
      }
      .iconxingbienv {
        color: pink;
      }
    }
  }
  .list{
    padding: 0 20px;
  }
}
</style>
