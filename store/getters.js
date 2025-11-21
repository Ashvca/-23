//需要使用的get方法可以定义在此处
const getters = {
  roleId: (state) => state.user.roleId,
  username: (state) => state.user.username,
  paramValueSub: (state) => {
    state.paramValue.paramValue1--
    state.paramValue.paramValue2--
    return state.paramValue
  },
  token: (state) => state.user.token,
  img: (state) => state.user.img,
}
export default getters
