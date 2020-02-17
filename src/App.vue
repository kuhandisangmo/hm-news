<template>
  <div id="app">
    <keep-alive :include="cacheList">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created () {
    console.log(this.$store)
  },
  computed: {
    ...mapState(['cacheList'])
  }
}
</script>
<style lang="scss">
</style>
