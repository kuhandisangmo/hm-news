import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // 缓存的组件的列表
  cacheList: []
}

const mutations = {
  // 缓存某个组件
  cache (state, name) {
    // 如果缓存列表中没有缓存的这个组件，我们就缓存起来
    if (!state.cacheList.includes(name)) {
      state.cacheList.push(name)
      console.log('缓存组件', name)
    }
  },
  // 不缓存某个组件
  uncache (state, name) {
    // 如果缓存列表中有这个组件，我们就不缓存这个组件
    if (state.cacheList.includes(name)) {
      state.cacheList = state.cacheList.filter(item => item !== name)
      console.log('不缓存组件', name)
    }
  }
}

const store = new Vuex.Store({
  strict: true,
  state,
  mutations
})

export default store
