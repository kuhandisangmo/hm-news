<template>
  <div class="tab-manager">
      <info-title>栏目管理</info-title>
      <div class="manager">
      <div class="title">点击添加以下频道</div>
        <div class="list">
            <div class="item" v-for="(item,index) in activeTabs" :key="item.id" @click="del(index)">{{item.name}}</div>
        </div>
      <div class="title">点击删除以下频道</div>
       <div class="list">
            <div class="item" v-for="(item , index) in deactiveTabs" :key="item.id" @click="add(index)">{{item.name}}</div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 激活的栏目 默认情况下都是激活的
      activeTabs: [],
      //   未激活的栏目
      deactiveTabs: []
    }
  },
  created () {
    const activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
    const deactiveTabs = JSON.parse(localStorage.getItem('deactiveTabs'))
    if (activeTabs && deactiveTabs) {
      this.activeTabs = activeTabs
      this.deactiveTabs = deactiveTabs
    } else {
      this.getHomeList()
    }
  },
  methods: {
    async getHomeList () {
      const res = await this.$axios.get(`/category`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.activeTabs = data
        console.log(this.activeTabst)
      }
    },
    del (index) {
      if (this.activeTabs.length < 4) {
        return
      }
      this.deactiveTabs.push(this.activeTabs[index])
      this.activeTabs.splice(index, 1)
    },
    add (index) {
      this.activeTabs.push(this.deactiveTabs[index])
      this.deactiveTabs.splice(index, 1)
    }
  },
  watch: {
    activeTabs () {
      localStorage.setItem('activeTabs', JSON.stringify(this.activeTabs))
      localStorage.setItem('deactiveTabs', JSON.stringify(this.deactiveTabs))
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-manager{
    .manager{
        padding: 10px;
        .title{
            color: #888;
        }
        .list{
            overflow: hidden;
            padding: 10px 0;
            .item{
                float: left;
                width: 60px;
                height: 30px;
                font-size: 13px;
                text-align: center;
                line-height: 30px;
                border: 1px solid #ddd;
                margin-left: 8px;
                margin-bottom: 8px;
                color: #000;
            }
        }
    }
}
</style>
