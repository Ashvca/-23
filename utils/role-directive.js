import store from '@/store/index.js'
import settings from '@/settings'

// 角色权限指令
export default {
  inserted(el, binding) {
    if (!Array.isArray(binding.value)) {
      console.error('v-role的值必须为字符串数组')
      return
    }
    // 检查是否启用该功能
    if (
      settings.login.enabled === false ||
      settings.role.enabled === false ||
      settings.role.enabledElement === false
    ) {
      return
    }

    const roleId = store.getters.roleId
    // 存在则返回
    if (binding.value.find((item) => roleId === item)) {
      return
    }
    // 不存在则隐藏
    el.style.display = 'none'
  },
}
