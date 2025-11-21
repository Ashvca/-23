<template>
  <!-- 修改密码对话框 -->
  <el-dialog
    title="修改用户密码"
    width="400px"
    :visible.sync="show"
    :before-close="handleClose"
    custom-class="theme-dialog"
    :modal-append-to-body="false"
  >
    <el-form ref="form" :model="pwdChangeForm" :rules="rules">
      <el-form-item prop="old">
        <el-input
          v-model="pwdChangeForm.old"
          class="theme-input"
          placeholder="旧密码"
          show-password
          clearable
          @keyup.enter.native="handleSubmit"
        />
      </el-form-item>
      <el-form-item prop="new">
        <el-input
          v-model="pwdChangeForm.new"
          class="theme-input"
          placeholder="新密码"
          show-password
          clearable
          @keyup.enter.native="handleSubmit"
        />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button class="theme-button" @click="handleClose">取消</el-button>
      <el-button
        class="theme-button"
        type="primary"
        :loading="loading"
        @click="handleSubmit"
        >修改</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { changePwd } from '@/api/user.js'
export default {
  name: 'PwdChangeDlg',
  model: {
    prop: 'show',
    event: 'closeDlg',
  },
  props: {
    show: Boolean,
  },
  data() {
    return {
      loading: false,
      // 表单
      pwdChangeForm: {
        old: '',
        new: '',
      },
      // 校验
      rules: {
        old: [
          {
            required: true,
            min: 4,
            max: 20,
            message: '旧密码长度在 4 到 20 个字符',
            trigger: 'blur',
          },
          {
            validator: this.validatorRepeat,
            trigger: 'blur',
          },
        ],
        new: [
          {
            required: true,
            min: 4,
            max: 20,
            message: '新密码长度在 4 到 20 个字符',
            trigger: 'blur',
          },
          {
            validator: this.validatorRepeat,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    // 校验密码重复
    validatorRepeat(rule, value, callback) {
      if (value === this.pwdChangeForm.old) {
        callback(new Error('新密码不能与旧密码相同'))
      } else {
        callback()
      }
    },
    handleClose() {
      this.pwdChangeForm.old = ''
      this.pwdChangeForm.new = ''
      this.$emit('closeDlg', false)
    },
    handleSubmit() {
      this.$refs.form.validate((validate) => {
        if (validate) {
          this.loading = true
          changePwd({
            userName: this.$store.getters.username,
            oldPwd: this.pwdChangeForm.old,
            newPwd: this.pwdChangeForm.new,
          })
            .then((res) => {
              this.loading = false
              this.handleClose()
              this.$message.success(res.msg)
              // 弹窗提示
              this.$alert('密码修改成功，请重写登录！', '提示', {
                type: 'warning',
                confirmButtonText: '确定',
                callback: () => {
                  this.$store.dispatch('user/logout')
                  // 执行退出
                  this.$router.push('/')
                  // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
                },
              })
            })
            .catch(() => {
              this.pwdChangeForm.old = ''
              this.loading = false
            })
        }
      })
    },
  },
}
</script>
