<template>
  <div class="login">
    <div class="close">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <hm-input placeholder="用户名/手机号码" v-model="username" :rules="/^1\d{4,10}$/" err-msg="输入的用户名格式错误"></hm-input>
    </div>
    <div class="password">
      <hm-input type="password" placeholder="密码" v-model="password" :rules="/^\d{3,10}$/" err-msg="输入的密码格式错误"></hm-input>
    </div>
    <div class="btn">
      <hm-button @click="login">登录</hm-button>
    </div>
    <div class="go-register">
      没有账号?立即<router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {
    // 将register注册的数据传到本地网页内存中
    // console.log(this.$route)
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
    // console.log(this.username, this.password)
  },
  methods: {
    async login () {
      if (!this.username || !this.password) return
      // console.log(this.username, this.password)
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      console.log(res)
      if (res.data.statusCode === 401) {
        // alert('用户名或者密码错误')
        this.$toast.fail('用户名或者密码错误')
      } else {
        // alert('登陆成功')
        console.log(res)
        const { token, user } = res.data.data
        localStorage.setItem('token', token)
        localStorage.setItem('user_id', user.id)
        this.$toast.success('登陆成功')
        this.$router.push('/profile')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  padding: 20px;
  .close {
    i {
      font-size: 27px;
    }
  }
  .logo {
    text-align: center;
    i {
      font-size: 126px;
      color: #d81e06;
    }
  }
  .btn{
    margin-top: 20px;
  }
  .go-register{
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    margin-top: 10px;
  }
}
</style>
