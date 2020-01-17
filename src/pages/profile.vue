<template>
  <div class="profile">
    <div class="user-info">
      <!-- 头像 -->
      <div class="avatar">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579179642709&di=2ed8d4155855262c5ae43c163a842543&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F2019-01-30%2F5c511a2c0dc0d.jpg" alt="">
      </div>
      <!-- 信息 -->
      <div class="info">
        <p>
          <i class="iconfont iconxingbienv"></i>
          <span>火星网友</span>
        </p>
        <p>2020.1.16</p>
      </div>
      <!-- 右箭头 -->
      <div class="icon">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <div class="list">
      <hm-nav name="我的关注" desc="关注的用户" @click="focus"></hm-nav>
      <hm-nav name="我的跟帖" desc="跟帖/回复"></hm-nav>
      <hm-nav name="我的收藏" desc="文章/视频"></hm-nav>
      <hm-nav name="设置"></hm-nav>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // id: ''
    }
  },
  created () {
    const userId = localStorage.getItem('user_id')
    // console.log(this.id)
    const token = localStorage.getItem('token')
    const res = this.$axios.get(`/user/${userId}`, { headers: {
      Authorization: token
    } })
    console.log(res)
  },
  methods: {
    focus () {
      this.$router.push('/focus')
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
      i{
        color: #75B9EB;
      }
    }
  }
  .list{
    padding: 0 20px;
  }
}
</style>
