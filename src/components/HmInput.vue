<template>
  <div class="input_box">
    <input class="hm-input" :type="type" :placeholder="placeholder"  @input="handleInput" :value="value" :class="[status]"/>
    <span class="tips" v-show="showTips">{{errMsg}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: ''
    }
  },
  // 接收数据
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    rules: {
      type: RegExp
    },
    errMsg: {
      type: String
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    showTips () {
      return this.status === 'err' && this.errMsg
    }
  },
  methods: {
    handleInput (e) {
      // console.log(e)
      const { value } = e.target
      // console.log('haha')
      this.$emit('input', value)

      // 使用rules校验
      if (!this.rules) return
      if (this.rules.test(value)) {
        this.status = 'success'
      } else {
        this.status = 'err'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input_box{
  padding-bottom: 15px;
  position: relative;
  .hm-input{
    width: 100%;
    height: 38px;
    background-color: transparent;
    border-bottom: 1px solid #666;
    font-size: 18px;
    color: #666;
    &.err{
      border-color: red;
    }
    &.success{
      border-color: green;
    }
  }
  .tips{
    color: red;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
