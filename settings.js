/**
 * 框架配置文件，设计布局，样式等配置
 */

// 菜单模式枚举值
export const MenuMode = {
  Left: 0,
  Top: 1,
}

// 环境变量
export default {
  /**
   * @type {string}
   * @description 项目标题
   */
  title: '可视化案例',
  // 登录相关配置
  login: {
    /**
     * @type {boolean}
     * @description 是否启用登录功能
     */
    enabled: false,
    /**
     * @type {boolean}
     * @description 是否启用用户设置
     */
    enabledUserSettings: true,
    /**
     * @type {number}
     * @description 登录有效期,单位天
     */
    loginExpires: 7,
  },
  // 页面布局
  layout: {
    /**
     * @type {MenuMode}
     * @description 主菜单模式，左侧和顶部
     */
    menuMode: MenuMode.Left,
    /**
     * @type {number}
     * @description 左侧菜单宽度
     */
    leftMenuWidth: 300,
    // 屏幕自适应
    autoResize: {
      /**
       * @type {boolean}
       * @description 使能自适应屏幕大小功能
       */
      enabled: true,
      /**
       * @type {number}
       * @description 设计屏幕宽度
       */
      width: 1920,
      /**
       * @type {number}
       * @description 设计屏幕高度
       */
      height: 1080,
    },
  },
  // 角色配置
  role: {
    /**
     * @type {boolean}
     * @description 是否启用角色管理
     */
    enabled: true,
    /**
     * @type {boolean}
     * @description 使能针对路由的角色管理
     */
    enabledRouter: true,
    /**
     * @type {boolean}
     * @description 使能针对元素的角色管理
     */
    enabledElement: true,
  },
}
