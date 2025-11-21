<template>
  <div class="input-number">
    <el-input
      ref="input"
      v-model="currentValue"
      :disabled="disabled"
      type="text"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :class="inputBorder"
      :size="size"
      @input="afterReplace"
      @blur="checkError"
    >
      <template v-if="suffix !== ''" slot="suffix">{{ suffix }}</template>
    </el-input>
    <div
      ref="error"
      class="input-error-tip"
      :style="{ height: line * 1 + 'px' }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'FloatInput',
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
      default: 0,
    },
    maxlength: {
      type: Number,
      default: 0,
    },
    decimal: {
      type: Number,
      default: 0,
    },
    value: {
      type: [String, Number],
      default: '',
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
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
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
      // console.log(val);
      this.currentValue = val
    },
    currentValue: function (val) {
      // console.log(val);
      this.$emit('input', val)
      this.$emit('on-change', val)
      // this.getCursorPos();
      this.checkError()
    },
    // 使用该组件的文件需要定义一个方法接收errorHidden，并在各个表单中设置相应变量，作用：控制提交表单按钮的置灰和正常状态
    errorHidden: function (val) {
      if (val) {
        this.hide()
      }
      this.$emit('errorHidden', !val)
    },
  },
  mounted() {},
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

      // if(elInput.value == '00'){
      // 	return 0;
      // }
      // if(elInput.value == '-00'){
      // 	return 0;
      // }
      // if(elInput.value == '0-'){
      // 	return 0;
      // }
      // if(elInput.value == '--'){
      // 	return 0;
      // }
      // if(elInput.value == '-.'){
      // 	return 0;
      // }
      // if(elInput.value == '-0-'){
      // 	return 0;
      // }
      // if(elInput.value == '-0..'){
      // 	return 0;
      // }
      // if(elInput.value == '0..'){
      // 	return 0;
      // }

      // if (elInput.value == '.') {
      //     return 0;
      // }
      // if (elInput.value.indexOf('.') != -1 && elInput.value.indexOf('.') == 0) {
      //     return elInput.value.replace(".", "")
      // }

      // if (elInput.value.substring(0,2) == '-.') {
      //     return 0;
      // }
      // if (elInput.value.indexOf('-') != -1 && elInput.value.indexOf('-') != 0) {
      //     return elInput.value.replace("-", "")
      // }

      return elInput.value
    },
    afterReplace() {
      this.currentValue = this.replaceAndSetPos([/[^\d.-]/g], [''])
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
            'display:inline-block;float:left; opacity: 1; height: ' +
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
          'display:inline-block;float:left; opacity: 0;height: ' +
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
      var res =
        (this.currentValue * Math.pow(10, this.decimal) -
          this.min * Math.pow(10, this.decimal)) %
        (this.step * Math.pow(10, this.decimal))
      if (res === 0) {
        return true
      } else {
        return false
      }
    },
    // 检查小数位数
    checkDecimal() {
      // let currentValue = this.currentValue + ' '
      // console.log(typeof this.currentValue.toString());
      // console.log(this.currentValue);
      // var decimals = this.currentValue.toString().split('.')[1];
      var decimals = this.currentValue.toString().split('.')[1]
      if (decimals === undefined) {
        return true
      }
      if (decimals.length <= this.decimal) {
        return true
      } else {
        return false
      }
    },
    // 检查是否为数字
    numberCheck(val) {
      var pattern = /^-?([1-9]\d*|0)($|[.]\d+$)/
      return pattern.test(val)
    },
    // 检查错误情况并显示错误信息
    checkError() {
      this.errMsg = this.min + ' ~ ' + this.max
      if (this.decimal !== 0) {
        this.errMsg += '，最多' + this.decimal + '位小数'
      }
      if (this.step !== 0) {
        this.errMsg += '，步进' + this.step
      }
      // var pattern = /^-?([1-9]\d*|0)($|.\d*[1-9]$)/;
      // var pattern =  /^-?([1-9]\d*|0)($|.\d*[1-9]$)/;
      if (
        this.currentValue === '' ||
        this.currentValue < this.min ||
        this.currentValue > this.max ||
        !this.checkStep() ||
        !this.checkDecimal() ||
        !this.numberCheck(this.currentValue)
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
  line-height: 12px;
  text-align: left;
  // margin-bottom: -22px; //配合el-form-item自带间距使用，normal-22px  medium-20px  mini-18px，若不在el-form中使用则将其注释
  // height: 22px;
}
.error {
  .el-input__inner {
    border-color: #f56c6c;
  }
}
</style>
