import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import Wallet from './modules/wallet'
import actions from './action'

Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
    mutations,
    Wallet
  },
  actions
})
