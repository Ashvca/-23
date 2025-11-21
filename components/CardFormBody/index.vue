<template>
  <div>
    <el-form
      v-if="formItem.length"
      ref="form"
      class="theme-form"
      label-width="140px"
    >
      <el-form-item
        v-for="(item, index) in formItem"
        :key="index"
        :label="item.label"
      >
        <el-input
          v-if="item.element == 'input'"
          v-model="item.value"
          class="theme-input"
        ></el-input>
        <el-select
          v-if="item.element == 'select'"
          v-model="workType"
          class="theme-input"
          placeholder="请选择"
          popper-class="theme-popper"
          @change="changeWorkType"
        >
          <el-option
            v-for="i in options"
            :key="i.value"
            :label="i.label"
            :value="i.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-descriptions
      v-if="descriptions.length"
      :class="(column == 1 ? 'singleColumn' : '') + ' theme-descriptions'"
      title=""
      :column="column"
      :colon="false"
    >
      <el-descriptions-item
        v-for="(item, index) in descriptions"
        :key="index"
        :label="item.label"
        >{{ item.content }}</el-descriptions-item
      >
    </el-descriptions>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    // 按钮名称
    formItem: {
      type: Array,
      default() {
        return []
      },
    },
    descriptions: {
      type: Array,
      default() {
        return []
      },
    },
    // 描述的列数
    column: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      options: [
        {
          value: 0,
          label: '四阵元',
        },
        {
          value: 11,
          label: '七阵元',
        },
      ],
      value: '',
      workType: 11,
      forData: {},
    }
  },
  methods: {
    changeWorkType() {
      this.$emit('getWorkType', this.workType)
    },
  },
}
</script>
<style lang="scss" scoped>
.el-descriptions {
  width: 100%;
}
::v-deep .el-descriptions__body {
  height: 100%;
  width: 100%;
}
::v-deep .singleColumn {
  .el-descriptions__table {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
::v-deep .el-descriptions-item__label {
  width: 100px;
  text-align: right;
}
</style>
