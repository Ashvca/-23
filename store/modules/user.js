import { getUserInfo, setUserInfo, removeUserInfo } from '@/utils/user'
const getDefaultState = () => {
  return {
    roleId: getUserInfo().roleId, // 获取记录的角色
    username: getUserInfo().username, // 用户名
    token: getUserInfo().token, // token
    img: getUserInfo().img, // token
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    console.log(state)
    Object.assign(state, getDefaultState())
  },
  SET_USER_INFO: (state, param) => {
    state.username = param.username
    state.roleId = param.roleId
    state.token = param.token
    state.img = param.img
  },
}

const actions = {
  // 登录
  login({ commit }, param) {
    const { roleId, username, save, token, img } = param
    setUserInfo(username, roleId, save, token, img)
    commit('SET_USER_INFO', { username, roleId, token, img })
  },
  // 退出
  logout({ commit }) {
    // cookies中删除
    removeUserInfo()
    commit('RESET_STATE')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
