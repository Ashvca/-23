<template>
  <div class="login">
    <h1>{{ $settings.title }}</h1>
    <el-row>
      <el-col
        :xs="{ span: 20, offset: 2 }"
        :sm="{ span: 16, offset: 4 }"
        :md="{ span: 10, offset: 12 }"
        :lg="{ span: 6, offset: 9 }"
      >
        <el-form ref="form" :model="form" :rules="rules">
          <h3>{{ title }}</h3>
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              class="theme-input"
              prefix-icon="el-icon-s-custom"
              size="big"
              placeholder="用户名"
              clearable
              @keyup.enter.native="handleSubmit"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              class="theme-input"
              prefix-icon="el-icon-key"
              size="big"
              placeholder="密码"
              show-password
              clearable
              @keyup.enter.native="handleSubmit"
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked" class="theme-checkbox"
              >保持登录状态</el-checkbox
            >
          </el-form-item>
          <el-form-item>
            <el-button
              size="big"
              type="primary"
              class="theme-button"
              :loading="loading"
              @click="handleSubmit"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { login } from '@/api/user.js'

export default {
  name: 'Login',
  data() {
    return {
      title: '用户登录',
      loading: false,
      form: {
        username: '',
        password: '',
      },
      checked: true,
      rules: {
        username: [
          {
            required: true,
            min: 4,
            max: 20,
            message: '用户名长度在 4 到 20 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            min: 4,
            max: 20,
            message: '密码长度在 4 到 20 个字符',
            trigger: 'blur',
          },
        ],
        // 登录后的重定向
        redirect: undefined,
      },
    }
  },
  watch: {
    // 监听route获取重定向
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true,
    },
  },
  methods: {
    handleSubmit() {
      let username = this.form.username
      this.$refs.form.validate((validate) => {
        if (validate) {
          this.loading = true
          login(this.form)
            .then((data) => {
              // 存到全局变量中
              this.$store.dispatch('user/login', {
                username,
                roleId: data.data.status,
                save: this.checked,
                token: data.data.token,
                img: data.data.img,
              })
              this.$message.success(data.msg)
              this.$router.push('/examples/notice/index')
              // this.$router.push({ path: this.redirect || '/' })
              // // 关闭载入
              this.loading = false
              // 跳转到home
            })
            .catch((e) => {
              this.loading = false
              console.log(e)
            })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~theme/index.scss';
.login {
  height: 100%;
  background-image: url('../../assets/views/login/bg.jpg');
  background-size: 100% 100%;
  background-color: #021a2d;
  position: relative;
  h1 {
    width: 100%;
    padding-top: 38px;
    text-align: center;
    font-weight: 700;
    color: #00e0ff;
    font-size: 58px;
    letter-spacing: 20px;
  }
  .el-row {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    .el-col {
      background-color: #0a395e;
      border-radius: 8px;
      box-shadow: 0px 0px 14px #0e94f3 inset;
    }
    .el-form {
      padding: 48px;
      h3 {
        width: 100%;
        color: #ffff;
        font-weight: 700;
        text-align: center;
        font-size: 26px;
        margin-bottom: 38px;
      }
      .el-button {
        height: 56px;
        width: 100%;
        font-size: 23px;
      }
    }
  }
}
</style>
