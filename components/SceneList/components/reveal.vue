<template>
  <el-table :data="tableData" style="width: 100%" class="theme-table">
    <el-table-column
      v-for="(item, index) in labels"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      width="width"
    >
    </el-table-column
    ><el-table-column label="操作">
      <template>
        <el-button
          size="mini"
          type="primary"
          class="theme-button"
          @click="remove(index)"
          >删除</el-button
        >
        <el-button
          size="mini"
          type="primary"
          class="theme-button"
          @click="edit(index)"
          >修改</el-button
        >
      </template></el-table-column
    ></el-table
  >
</template>
<script>
export default {
  props: {
    labels: {
      type: Array,
      default: () => {
        return [
          {
            label: '设备',
            prop: 'device',
          },
          {
            label: '指令',
            prop: 'command',
          },
        ]
      },
    },
    cmdList: {
      type: Array,
      default: () => {
        return [
          {
            device: '接收机1',
            command: '接收卫星通道设定1',
          },
          {
            device: '设备采样设备',
            command: '控制指令',
          },
        ]
      },
    },
  },
  data() {
    return {
      tableData: [
        {
          device: '接收机1',
          command: '接收卫星通道设定1',
        },
        {
          device: '设备采样设备',
          command: '控制指令',
        },
      ],
    }
  },
  computed: {
    // 修改按钮展示状态判断
    editButtonShow() {
      // 需要隐藏修改按钮的菜单key集合
      let hiddenKeyArray = ['0301', '0302', '0402']
      // 判断cmdList项的missionName属性的key属性的值是否在需要隐藏的集合中
      return this.cmdList.map((item) => {
        return hiddenKeyArray.includes(item.missionName.key) ? false : true
      })
    },
  },
  methods: {
    // 删除命令集列表项
    remove(index) {
      console.log('删除索引：')
      console.log(index)
      this.$emit('cmdItemRemove', index)
    },
    //
    //修改命令集列表项
    edit(index) {
      console.log('修改索引：')
      console.log(index)
      this.$emit('cmdItemEdit', index)
    },
  },
}
</script>
<style lang="scss" scoped>
.reveal {
  height: 500px;
  margin-left: 15px;
  background-color: rgba(8, 51, 85, 0.3);
}
.scene {
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 5px;
  font-weight: bold;
  color: #9be0ff;
}
.border {
  width: 357px;
  height: 450px;
  overflow-y: auto;
  border: 1px solid;
  border-color: #1b6faf;
  border-radius: 4px;
  position: relative;
  left: 23px;
  .title {
    background-color: #0a395e;
    width: 100%;
    height: 28px;
    border-radius: 3px;
    opacity: 40%;
  }
  .theme-button {
    width: 50px;
    height: 25px;
    text-align: center;
    border: 0px;
    background-color: #1b6faf;
  }
  .neirong {
    display: flex;
    align-items: center;
    height: 35px;
    border-bottom: 1px solid;
    border-color: #1b6faf;
  }
}
</style>
