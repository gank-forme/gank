import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  addData:'',
  add1Data:'',
  infoData:''
}
const actions={
  //homeData:'',
}
const mutations ={
  addFun (state,data){
    state.addData=data
  },
  add1Fun (state,data){
    state.add1Data=data
  },
  infoFun (state,data){
    state.infoData=data
  },
}
const getters = {

}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{}
})
