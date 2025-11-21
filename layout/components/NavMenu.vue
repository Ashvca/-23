<template>
  <div
    class="nav-menu"
    :style="{
      paddingBottom: menuMode == 'horizontal' ? '0px' : 20 + 'px',
      overflowY: menuMode == 'horizontal' ? 'hidden' : 'auto',
    }"
  >
    <el-menu
      :background-color="menuBgColor"
      :text-color="menuTextColor"
      :active-text-color="menuActiveTextColor"
      router
      :default-active="active"
      :mode="menuMode"
      :class="menuMode"
    >
      <!-- 第二层循环该系统下的节点循环出来 -->
      <template v-for="(nodeItem, nodeIndex) in nodeData">
        <!-- 判断是否为单层的 -->
        <el-menu-item
          v-if="nodeItem.children === undefined"
          :key="nodeIndex"
          :index="nodeItem.path"
        >
          <!-- 显示图标 -->
          <i :class="nodeItem.icon" />
          <!-- 显示标题 -->
          <span slot="title">{{ nodeItem.title }}</span>
        </el-menu-item>
        <!-- 有二级菜单 -->
        <el-submenu v-else :key="nodeIndex" :index="nodeItem.path">
          <!-- 显示二级标题 -->
          <template slot="title">
            <i :class="nodeItem.icon" />
            <span>{{ nodeItem.title }}</span>
          </template>
          <!-- 循环 二级菜单 -->
          <el-menu-item
            v-for="(childrenItem, childrenIndex) in nodeItem.children"
            :key="childrenIndex"
            :index="childrenItem.path"
          >
            <i v-if="childrenItem.icon" :class="childrenItem.icon" />
            <span>{{ childrenItem.title }} </span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import themeColor from '~theme/index.scss'
import { MenuMode } from '@/settings.js'

export default {
  name: 'NavMeun',
  data() {
    return {
      nodeData: [],
      // active: null,
      menuBgColor: themeColor.themeColor,
      menuTextColor: themeColor.menuTextColor,
      menuActiveTextColor:
        this.$settings.layout.menuMode === MenuMode.Left
          ? themeColor.menuActiveTextColor
          : themeColor.successColor,
      menuMode:
        this.$settings.layout.menuMode === MenuMode.Left
          ? 'vertical'
          : 'horizontal',
    }
  },
  computed: {
    active() {
      return this.$route.path
    },
  },
  mounted() {
    // 产生渲染数据
    this.nodeData = this.makeNodeData(this.$router.options.routes)
    // 设置当却路径
    // this.active = this.$route.path
  },
  methods: {
    // 判断是否增添
    isPush(node) {
      if (node.hidden === true) {
        return false
      }
      // 如果没有登录功能则不需要进行检测
      if (
        this.$settings.login.enabled === false ||
        this.$settings.role.enabled === false ||
        this.$settings.role.enabledRouter === false
      ) {
        return true
      }
      // 没设置权限直接过
      if (node.meta.roles === undefined) {
        return true
      }
      return node.meta.roles.find(
        (index) => index === this.$store.getters.roleId
      )
    },
    // 生成节点
    makeNodeData(router) {
      const nodes = []
      // 遍历节点
      for (const index of router) {
        // 不要求显示的则跳过
        if (index.hidden === true) {
          continue
        }
        // 没有子路由直接跳转
        if (index.children === undefined) {
          continue
        }
        // 只有一级
        if (index.children.length < 1) {
          if (this.isPush(index.children[0])) {
            nodes.push({
              title: index.children[0].meta.title,
              path: index.children[0].path,
              children: undefined,
              icon: index.children[0].meta.iconClass,
            })
          }
        } else {
          // 生产子节点
          const makeChlidrenNode = (children) => {
            let result = []
            for (const childrenIndex of children) {
              if (this.isPush(childrenIndex)) {
                result.push({
                  title: childrenIndex.meta.title,
                  path: childrenIndex.path,
                  children: undefined,
                  icon: childrenIndex.meta.iconClass,
                })
              }
            }
            return result
          }
          if (this.isPush(index)) {
            nodes.push({
              title: index.meta.title,
              path: index.path,
              children: makeChlidrenNode(index.children),
              icon: index.meta.iconClass,
            })
          }
        }
      }
      return nodes.length === 0 ? undefined : nodes
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~theme/index.scss';
.nav-menu {
  background-color: $themeColor;
  overflow-x: hidden;
  border-top: 1px solid $bgColor;
  .el-menu {
    border-right-color: $bgColor;
    border-bottom-color: $bgColor;

    i {
      display: inline-block;
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
      vertical-align: middle;
    }
  }
}
// 选中
::v-deep .vertical .el-menu-item.is-active {
  background-color: $highlightBgColor !important;
}
</style>
