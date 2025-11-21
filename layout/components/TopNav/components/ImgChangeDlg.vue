<template>
  <!-- 修改密码对话框 -->
  <el-dialog
    title="修改头像"
    width="400px"
    :visible.sync="show"
    :before-close="handleClose"
    custom-class="theme-dialog"
    :modal-append-to-body="false"
  >
    <el-upload
      ref="upload"
      class="theme-upload"
      action=""
      :http-request="uploadFile"
      :on-change="changeFile"
      :auto-upload="false"
      :show-file-list="false"
      accept=".png,.jpg,.gif"
      :file-list="fileList"
    >
      <!-- <el-row type="flex" justify="center" align="middle" style="width: 100%"> -->
      <img v-if="imageUrl" :src="imageUrl" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <!-- </el-row> -->
      <div slot="tip" class="el-upload__tip" style="text-align: center">
        只能上传jpg/png/gif文件，且不超过1M
      </div>
    </el-upload>

    <span slot="footer">
      <el-button class="theme-button" plain @click="handleClose"
        >取消</el-button
      >
      <el-button
        class="theme-button"
        plain
        :loading="loading"
        @click="submitUpload"
        >修改</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { changePhotoByFile, changePhotoByBolob } from '@/api/utils.js'
// import { base64ToBlob } from '@/utils/file.js'
import { mapGetters } from 'vuex'
export default {
  name: 'ImgChangeDlg',
  model: {
    prop: 'show',
    event: 'closeDlg',
  },
  props: {
    show: Boolean,
  },
  data() {
    return {
      fileList: [],
      loading: false,
      imageUrl: '',
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
  computed: {
    ...mapGetters({
      img: 'img',
    }),
  },
  watch: {
    img: {
      handler(e) {
        // base64转blob，目前转的是残缺图
        // var str1 = e.split(',')[0]
        // str1 = str1.substring(5, str1.length - 7)
        // var str2 = e.split(',')[1]
        // base64ToBlob(str2, str1).then((e) => {
        //   console.log(e.preview)
        // })
        this.imageUrl = e
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleClose() {
      this.fileList = []
      this.$emit('closeDlg', false)
    },
    changeFile(files, fileList) {
      //不做文件限制数量处理，多选之后，取最新的
      if (files.size > 1024 * 1024 * 1) {
        this.$message.warning('文件太大')
        return
      }
      if (fileList.length > 1) {
        fileList.splice(0, fileList.length - 1)
      }
      this.imageUrl = URL.createObjectURL(files.raw)
    },
    uploadFile(file) {
      //将文件传给后台，后台存储base64，登陆时传递回来，显示头像
      const formData = new FormData()
      formData.append('file', file.file)
      formData.append('username', this.$store.state.user.username)
      changePhotoByFile(formData)
        .then((e) => {
          this.$message.success(e.msg)
          // this.$store.state.user.img = e.data
          //将修改的URL.createObjectURL传给头像，也可以用接口调回来的base64
          this.$store.state.user.img = this.imageUrl
          this.fileList = []
          this.$emit('closeDlg', false)
        })
        .catch((e) => {})
        .then((e) => {
          this.loading = false
        })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~theme/index.scss';
img {
  width: 100px;
  border-radius: 50px;
  height: 100px;
}
i {
  border: 1px solid $borderColor;
  line-height: 100px;
  width: 100px;
  height: 100px;
}
</style>
