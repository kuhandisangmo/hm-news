<template>
  <div class="test" v-if='isShowCropper'>
  <vue-cropper ref="cropper"
     :img="option.img"
     :autoCrop="option.autoCrop"
     :autoCropWidth="option.autoCropWidth"
     :autoCropHeight="option.autoCropHeight"
     :fixed="option.fixed"> </vue-cropper>
     <div class="box">
     <van-button type="danger" @click='isShowCropper=false'>取消</van-button>
     <van-button type="primary" @click='onCubeImg'>确认裁剪</van-button>
     </div>
     <img :src="src" alt="">
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import img from '../assets/01.jpg'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      src: '',
      option: {
        img: img, // 裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 150, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        fixed: false // 是否开启截图框宽高固定比例
      },
      isShowCropper: true
    }
  },
  methods: {
    onCubeImg () {
      // 获取cropper的截图的base64 数据
      this.$refs.cropper.getCropData(data => {
        console.log(data)
        this.src = data
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
.test{
    position:absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    .box{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 66px;
        display: flex;
        justify-content: space-around;
    }
}
</style>
