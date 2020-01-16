<template>
  <div class="register">
    <div class="close">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <hm-input placeholder="用户名/手机号码" :rules="/^1\d{4,10}$/" v-model="form.username" err-msg="用户名格式错误"></hm-input>
    </div>
    <div class="nickname">
      <hm-input placeholder="昵称" v-model="form.nickname" :rules="/^[\u4e00-\u9fa5]{3,8}$/" err-msg="昵称只能是3-8位中文哟"></hm-input>
    </div>
    <div class="password">
      <hm-input placeholder="密码" v-model="form.password" :rules="/^\d{3,12}$/" err-msg="密码格式错误"></hm-input>
    </div>
    <div class="btn">
      <hm-button @click="register">注册</hm-button>
    </div>
    <div class="go-login">
      已有账号?立即<router-link to="/login">登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        nickname: '',
        password: ''
      }
    }
  },
  methods: {
    async register () {
      const res = await this.$axios.post('/register', this.form)
      console.log(res)
      if (res.data.statusCode === 400) {
        this.$toast.fail('用户名已存在')
      } else {
        this.$toast.success('注册成功')
        // 跳转到登录页
        this.$router.push({
          name: 'login',
          params: {
            username: this.form.username,
            password: this.form.password
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register{
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
  .go-login{
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    margin-top: 10px;
  }
}
</style>
