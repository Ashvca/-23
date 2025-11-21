<template>
  <div class="error" style="padding: 10px">
    <el-card class="theme-card">
      <ul>
        <li><img src="../../assets/views/error/error.png" /></li>
        <li style="font-size: 27px">{{ title }}</li>
        <li style="font-size: 20px">
          {{ info }}
        </li>
        <li>
          <el-button size="small" class="theme-button" @click="handleClick"
            ><i
              class="el-icon-right"
              style="margin-right: 10px"
            />返回上一页</el-button
          >
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Error',
  data() {
    return {
      title: '错误代码404 - 页面没有找到',
      info: '输入的地址不合法',
    }
  },
  mounted() {
    if (
      this.$route.query.code !== undefined &&
      this.$route.query.code === '401'
    ) {
      this.title = '错误代码401 - 没有权限'
      this.info = '您没有权限访问这个页面，请联系管理员'
    } else {
      this.title = '错误代码404 - 页面没有找到'
      this.info = '输入的地址不合法'
    }
  },
  methods: {
    handleClick() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~theme/index.scss';

.error {
  height: 100%;
  .el-card {
    height: 100%;
    ul li {
      text-align: center;
    }
    ul li:nth-child(n + 2) {
      height: 40px;
      line-height: 40px;
      color: $defaultColor;
    }
    ::v-deep .el-card__body {
      height: 100%;
      position: relative;
    }
    ul {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
