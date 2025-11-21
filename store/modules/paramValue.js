const getDefaultState = () => {
  return {
    paramValue1: -1,
    paramValue2: -1,
  }
}
//actions接收vuex信息，提交至mutations进行赋值处理，再用getter获取内容
const state = getDefaultState()

const mutations = {
  M_SET_PARAM_VALUE: (state, param) => {
    state.paramValue1 = param.paramValue1
    state.paramValue2 = param.paramValue2
  },
}
const actions = {
  A_SET_PARAM_VALUE({ commit }, param) {
    param.paramValue1 *= 2
    param.paramValue2 *= 2
    commit('M_SET_PARAM_VALUE', param)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
