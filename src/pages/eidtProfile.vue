<template>
  <div class="edit-profile">
      <info-title>编辑资料</info-title>

      <div class="box">
          <!-- 头像 -->
          <div class="avatar">
              <img :src="avatar" alt="">
              <!-- 上传头像 -->
              <van-uploader :after-read="afterRead" />
          </div>

          <hm-nav name="昵称" :desc="profile.nickname" @click='showNickname '></hm-nav>
          <hm-nav name="密码" desc="******" @click='showPassword'></hm-nav>
          <hm-nav name="性别" :desc="profile.gender === 1 ? '男':'女'" @click='showGender'></hm-nav>
      </div>
      <!-- 提供一个修改昵称的对话框 -->
      <!-- @confirm是点击确认的时候触发的事件 -->
      <van-dialog v-model="isShowNickname" title="修改昵称" show-cancel-button @confirm="editNickname">
        <van-cell-group>
          <van-field v-model="nickName" placeholder="请输入用户名" />
        </van-cell-group>
      </van-dialog>
      <!-- 修改密码的对话框 -->
      <van-dialog v-model="isShowPassword" title="修改密码" show-cancel-button @confirm="editPassword">
        <van-cell-group>
          <van-field v-model="password" placeholder="请输入用户名" />
        </van-cell-group>
      </van-dialog>
      <!-- 修改性别的对话框 -->
      <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm="editGender">
        <van-radio-group v-model="gender">
          <van-cell-group>
            <van-cell title="男" clickable @click="gender = 1">
              <van-radio slot="right-icon" :name="1" />
            </van-cell>
            <van-cell title="女" clickable @click="gender = 0">
              <van-radio slot="right-icon" :name="0" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-dialog>
  <!-- 准备一个遮罩层 -->
      <div class="mask" v-show='isShowMask'>
        <vue-cropper ref="cropper"
          :img="option.img"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixed="option.fixed"> </vue-cropper>
        <div class="boo">
         <van-button type="danger" @click='isShowMask=false'>取消</van-button>
         <van-button type="primary" @click='onCubeImg'>确认裁剪</van-button>
        </div>
      </div>
  </div>
</template>

<script>
import img from '../assets/01.jpg'
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      option: {
        img: '', // 裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 150, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        fixed: false // 是否开启截图框宽高固定比例
      },
      profile: {},
      loading: false,
      // 显示昵称编辑框
      isShowNickname: false,
      // 昵称
      nickName: '',
      // 显示密码编辑框
      isShowPassword: false,
      // 密码
      password: '',
      // 显示性别编辑框
      isShowGender: false,
      // 性别
      gender: '',
      // 遮罩层显示影藏
      isShowMask: false

    }
  },
  computed: {
    avatar () {
      if (this.profile.head_img) {
        // 如果有头像，拼接上基准路径
        return this.$axios.defaults.baseURL + this.profile.head_img
      } else {
        //   如果没有头像，就显示默认图像
        return img
      }
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    async getProfile () {
      // const token = localStorage.getItem('token')
      // 如果需要权限校验接口（用户登陆），需要发送请求的时候增加一个请求头
      // Authorization: token
      const userId = localStorage.getItem('user_id')
      const res = await this.$axios.get(`/user/${userId}`)
      this.profile = res.data.data
      this.loading = true
      console.log(this.profile)
    },
    // data是需要修改的数据
    async editProfile (data) {
      const id = localStorage.getItem('user_id')
      // const token = localStorage.getItem('token')
      const res = await this.$axios.post(`/user_update/${id}`, data)
      if (res.data.statusCode === 200) {
        // 需要重新渲染页面
        // 给一个提示消息
        this.$toast.success(res.data.message)
        this.getProfile()
      }
    },
    // 显示昵称
    showNickname () {
      this.isShowNickname = true
      this.nickName = this.profile.nickname
    },
    // 修改昵称
    editNickname () {
      this.editProfile({ nickname: this.nickName })
    },
    // 显示密码
    showPassword () {
      this.isShowPassword = true
      this.password = this.profile.password
    },
    // 修改密码
    editPassword () {
      this.editProfile({ password: this.password })
    },
    // 显示性别
    showGender () {
      this.isShowGender = true
      this.gender = this.profile.gender
    },
    editGender () {
      this.editProfile({ gender: this.gender })
    },
    // 上传图片
    async afterRead (file) {
      console.log(file)
      console.log('文件上传了')
      // 显示遮罩层
      this.isShowMask = true
      // 显示上传的图片并放到裁剪框
      this.option.img = file.content
      /* // 限制上传图片的格式
      if (file.file.type !== 'image/jpeg') {
        this.$toast('必须上传jpg格式图片')
        return
      }
      // 限制上传图片的大小
      // 大小校验 kb
      // 1mb = 1024 kb
      // 1kb = 1024 字节
      if (file.file.size / 1024 >= 40) {
        this.$toast('必须上传图片超过40 kb哟')
        return
      } */
      // 创建formDate对象，用于上传文件
      // const fd = new FormData()
      // // 参数1：name属性，后端用于获取文件，由接口决定
      // // 参数2：需要上传的文件
      // fd.append('file', file.file)
      // // 发送请求，上传文件
      // const res = await this.$axios.post('/upload', fd, {
      //   headers: {
      //     Authorization: localStorage.getItem('token')
      //   }
      // })
      // console.log(res)
      // const { statusCode, data } = res.data
      // if (statusCode === 200) {
      //   // 上传成功
      //   // 发送更换头像的请求
      //   this.editProfile({ head_img: data.url })
      // }
    },
    // 图片裁剪方法
    onCubeImg () {
      // 获取cropper的截图的base64 数据
      this.$refs.cropper.getCropData(async imgData => {
        console.log(imgData)
        // 创建formDate对象，用于上传文件
        const fd = new FormData()
        // 参数1：name属性，后端用于获取文件，由接口决定
        // 参数2：需要上传的文件
        const file = this.convertBase64UrlToBlob(imgData)
        fd.append('file', file)
        // 发送请求，上传文件
        const res = await this.$axios.post('/upload', fd, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
        // 上传成功
        // 发送更换头像的请求
          this.editProfile({ head_img: data.url })
          // 修改完成，隐藏遮罩层
          this.isShowMask = false
        }
      })
    },
    // 将base64的图片转换为file文件
    convertBase64UrlToBlob (urlData) {
      let bytes = window.atob(urlData.split(',')[1])// 去掉url的头，并转换为byte
      // 处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length)
      let ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/jpeg' })
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
    padding: 0 20px;
    .avatar{
        padding: 30px 0;
        position: relative;
        .van-uploader{
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
        }
        img{
            width:70px;
            height:70px;
            margin: 0 auto;
            border-radius: 50%;
        }
    }
}
.van-dialog{
  padding: 10px;
}
.van-field{
  border: 1px solid #ccc;
  margin-top: 10px;
}
.mask{
    position:absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    .boo{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 66px;
        display: flex;
        justify-content: space-around;
    }
}
</style>
