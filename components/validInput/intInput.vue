<template>
  <div class="input-number">
    <el-form-item :label="label">
      <el-input
        ref="input"
        v-model="currentValue"
        :disabled="disabled"
        type="text"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :class="inputBorder"
        @input="afterReplace"
        @blur="checkError"
      >
        <template v-if="suffix !== ''" slot="suffix">{{ suffix }}</template>
      </el-input>
      <div ref="error" class="input-error-tip"></div>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'IntInput',
  props: {
    max: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 1,
    },
    maxlength: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },

    suffix: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    line: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      currentValue: this.value,
      errorHidden: true,
      inputBorder: 'normal',
      errMsg: '',
    }
  },
  watch: {
    value: function (val) {
      this.currentValue = val
    },
    currentValue: function (val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
      this.checkError() //重新赋值后 判断是否错误
    },
    // 使用该组件的文件需要定义一个方法接收errorHidden，并在各个表单中设置相应变量，作用：控制提交表单按钮的置灰和正常状态
    errorHidden: function (val) {
      if (val) {
        this.hide()
      }
      this.$emit('errorHidden', val)
    },
  },
  methods: {
    // 清空输入框
    clearInput() {
      this.currentValue = ''
    },
    // 获取光标位置
    getCursorPos() {
      var CaretPos = 0
      var elInput = this.$refs.input.$el.getElementsByTagName('input')[0]
      // IE Support
      if (document.selection) {
        elInput.focus() // 获取光标位置函数
        var Sel = document.selection.createRange()
        Sel.moveStart('character', -elInput.value.length)
        CaretPos = Sel.text.length
      } else if (elInput.selectionStart || elInput.selectionStart === '0') {
        // Firefox/Safari/Chrome/Opera support
        CaretPos = elInput.selectionEnd
      }
      return CaretPos
    },
    // 定位光标
    setCursorPos(pos) {
      var elInput = this.$refs.input.$el.getElementsByTagName('input')[0]
      if (elInput.setSelectionRange) {
        // Firefox/Safari/Chrome/Opera
        elInput.focus()
        elInput.setSelectionRange(pos, pos)
      } else if (elInput.createTextRange) {
        // IE
        var range = elInput.createTextRange()
        range.collapse(true)
        range.moveEnd('character', pos)
        range.moveStart('character', pos)
        range.select()
      }
    },
    // 替换后定位光标在原处,可以这样调用οnkeyup=replaceAndSetPos(this,/[^/d]/g,'')
    replaceAndSetPos(patternArray, replaceArray) {
      // if(event.shiftKey||event.altKey||event.ctrlKey||event.keyCode==16||event.keyCode==17||event.keyCode==18||(event.shiftKey&&event.keyCode==36))
      // return
      var elInput = this.$refs.input.$el.getElementsByTagName('input')[0]
      // this.$refs.input.$el.getElementsByTagName('input')[0]
      var pos = this.getCursorPos() // 保存原始光标位置
      var temp = elInput.value // 保存原始值
      for (var index in patternArray) {
        elInput.value = elInput.value.replace(
          patternArray[index],
          replaceArray[index]
        ) // 替换掉非法值
      }
      // elInput.value = temp.replace(pattern, text).replace(pattern1, text1);
      // 截掉超过长度限制的字串（此方法要求已设定元素的maxlength属性值）
      var maxLength = elInput.getAttribute
        ? parseInt(elInput.getAttribute('maxlength'))
        : ''
      if (elInput.value.length > maxLength) {
        // 法一：obj.value = obj.value.substring( 0,max_length);若用户在中间进行输入，此方法则达不到效果
        // 法二：可以满足任何情况（当超过输入了，去掉新输入的字符）
        var str1 = elInput.value.substring(0, pos - 1)
        var str2 = elInput.value.substring(pos, maxLength + 1)
        elInput.value = str1 + str2
      }
      pos = pos - (temp.length - elInput.value.length) // 当前光标位置
      this.setCursorPos(pos) // 设置光标

      if (elInput.value * 1 == 0) {
        this.hide()
        return ''
      }

      let result = elInput.value.trim()

      //
      return result.replace(/\b(0+)/gi, '')
    },
    afterReplace() {
      this.currentValue = this.replaceAndSetPos([/[^\d-]/g], [''])
      this.checkError()
    },
    // 显示错误提示
    show(text) {
      if (text) {
        this.inputBorder = 'error'
        var mustEle = this.$refs.error
        if (mustEle) {
          // console.log("已找到该节点", mustEle);
          mustEle.innerHTML = ''
          mustEle.append(text)
          mustEle.setAttribute(
            'style',
            'display:inline-block;float:left; opacity: 1;height:' +
              this.line * 1 +
              'px'
          )
          this.errorHidden = false
        }
      }
    },
    // 隐藏错误提示
    hide() {
      this.inputBorder = 'normal'
      var mustEle = this.$refs.error
      if (mustEle) {
        // console.log("已找到该节点", mustEle);
        mustEle.innerHTML = ''
        // display:none;
        mustEle.setAttribute(
          'style',
          'display:inline-block;float:left;opacity: 0;height:' +
            this.line * 1 +
            'px'
        )
        this.errorHidden = true
      }
    },
    // 检查步进
    checkStep() {
      if (this.step === 0) {
        return true
      }
      var res = (this.currentValue - this.min) % this.step
      if (res === 0) {
        return true
      } else {
        return false
      }
    },
    // 检查错误情况并显示错误信息
    checkError() {
      this.errMsg = this.min + ' ~ ' + this.max
      // && this.step !== 1
      if (this.step !== 0) {
        this.errMsg += '，步进' + this.step
      }
      var pattern = /^-?(0|[1-9][0-9]*)$/
      if (
        this.currentValue === '' ||
        this.currentValue === '-0' ||
        this.currentValue < this.min ||
        this.currentValue > this.max ||
        !this.checkStep() ||
        !pattern.test(this.currentValue)
      ) {
        this.show(this.errMsg)
      } else {
        this.hide()
      }
    },
  },
}
</script>

<style lang="scss">
.input-error-tip {
  color: #f56c6c;
  font-size: 12px;
  // line-height: 22px;
  text-align: left;
  // margin: 0;
  margin-bottom: -18px; //配合el-form-item自带间距使用，normal-22px  medium-20px  mini-18px，若不在el-form中使用则将其注释
  // height: 22px;
}
.error {
  .el-input__inner {
    border-color: #f56c6c;
  }
}
.input-number .el-form-item--mini.el-form-item {
  margin-bottom: 0;
}
</style>
