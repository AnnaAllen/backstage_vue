import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: ''
  },
  mutations: {
    SET_TEST(state, value) {
      state.data = value
      console.log(state.data)
    }
  },
  actions: {
  },
  modules: {
    
  }
})
