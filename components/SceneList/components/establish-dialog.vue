<template>
  <div>
    <el-dialog
      title="新建场景"
      :visible.sync="show"
      width="1292px"
      center
      :before-close="handleClose"
      custom-class="theme-dialog"
      append-to-body
      :modal="false"
      style=""
    >
      <div class="showmiddle">
        <div class="line" style="margin-bottom: 10px"></div>
        <div class="center">
          <div
            class="theme-card"
            style="
              width: 1312px;
              height: 70px;
              border-radius: 8px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            <span style="margin-left: 35px; margin-right: 20px">场景名称</span>
            <el-input
              v-model="sceneName"
              placeholder="请输入场景名称"
              style="width: 980px"
            ></el-input>
          </div>
        </div>
        <div class="theme-card" style="border-radius: 8px; height: 559px">
          <el-row>
            <div
              style="
                margin-left: 16px;
                font-size: 16px;
                margin-top: 10px;
                margin-bottom: 10px;
              "
            >
              <span>设置参数</span>
            </div>
            <el-col :span="5" class="buju1">
              <div class="select">
                <el-tree
                  node-key="data.id"
                  @children="onChildren"
                  :data="menuData"
                  :props="menuDefaultProps"
                  @node-click="handleNodeClick"
                ></el-tree>
              </div>
            </el-col>
            <el-col :span="10" class="buju2">
              <div>
                <!-- 接收卫星通道设定 -->
                <receive-satellite v-show="judge_show0001"></receive-satellite>
                <!-- 天线坐标设置 -->
                <aisle-location v-show="judge_show0002"></aisle-location>
                <!-- 通道1定位模式设置指令 -->
                <instruct v-show="judge_show0003"></instruct>
                <!-- 1PPS输入输出时延设置 -->
                <PPS-delayTime v-show="judge_show0004"></PPS-delayTime>
                <!-- 射频采样社备的控制指令 -->
                <rf
                  :formIndex="formIndex"
                  :formData="formData"
                  :formState="formState"
                  @submit="submit"
                  v-if="judge_show0101"
                ></rf>
                <!-- 工作模式切换  -->
                <work-pattern
                  :formIndex="formIndex"
                  :formData="formData"
                  :formState="formState"
                  @submit="submit"
                  v-if="judge_show0201"
                ></work-pattern>
                <!-- 抗干扰算法加载文件头 -->
                <load-head
                  :formIndex="formIndex"
                  :formData="formData"
                  :formState="formState"
                  @submit="submit"
                  v-if="judge_show0202"
                ></load-head>
                <!-- 抗干扰算法加载数据包 -->
                <load-state
                  :formIndex="formIndex"
                  :formData="formData"
                  :formState="formState"
                  @submit="submit"
                  v-if="judge_show0203"
                ></load-state>
                <!-- //启动指令 -->
                <start
                  :formIndex="formIndex"
                  :formData="formData"
                  :formState="formState"
                  @submit="submit"
                  v-if="judge_show0301"
                ></start>
                <!-- //停止指令 -->
                <cease
                  :formIndex="formIndex"
                  :formData="formData"
                  :formState="formState"
                  @submit="submit"
                  v-if="judge_show0302"
                ></cease>
                <!-- //等待指令 -->
                <wait
                  :formIndex="formIndex"
                  :formData="formData"
                  :formState="formState"
                  @submit="submit"
                  v-if="judge_show0401"
                ></wait>
                <!-- //等待回执 -->
                <wait-back-value
                  :formIndex="formIndex"
                  :formData="formData"
                  :formState="formState"
                  @submit="submit"
                  v-if="judge_show0402"
                ></wait-back-value>
              </div>
            </el-col>

            <el-col :span="8">
              <div>
                <reveal
                  ref="revealDlg"
                  :cmdList="cmdList"
                  @cmdItemRemove="cmdItemRemove"
                  @cmdItemEdit="cmdItemEdit"
                  v-if="cmdListShowState"
                ></reveal>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="btn">
          <el-button class="theme-button" type="success" @click="save"
            >保存</el-button
          >
          <el-button class="theme-button" type="success">另存</el-button>
          <el-button class="theme-button" type="success">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import instruct from '@/views/scene-list/components/instruct'
import reveal from '@/views/scene-list/components/reveal'
import rf from '@/views/scene-list/components/rf'
import receiveSatellite from '@/views/scene-list/components/receive-satellite'
import aisleLocation from '@/views/scene-list/components/aisle-location'
import PPSDelayTime from '@/views/scene-list/components/PPS-delayTime'
import workPattern from '@/views/scene-list/components/work-pattern'
import loadHead from '@/views/scene-list/components/load-head'
import loadState from '@/views/scene-list/components/load-state'
import start from '@/views/scene-list/components/start'
import cease from '@/views/scene-list/components/cease'
import wait from '@/views/scene-list/components/wait'
import waitBackValue from '@/views/scene-list/components/waitBackValue'
import { saveCommand } from '@/api/scene'
export default {
  components: {
    instruct,
    reveal,
    rf,
    receiveSatellite,
    aisleLocation,
    PPSDelayTime,
    workPattern,
    start,
    cease,
    wait,
    waitBackValue,
    loadHead,
    loadState,
  },
  data() {
    return {
      // 所属场景名称
      sceneName: '',
      // 左边菜单数据
      menuData: [
        {
          key: '00',
          label: '多模符合导航信号接收机',
          children: [
            {
              key: '0001',
              label: '接收卫星通道设定',
            },
            {
              key: '0002',
              label: '天线坐标设置指令',
            },
            {
              key: '0003',
              label: '通道1定位模式设置指令',
            },
            {
              key: '0004',
              label: '1PPS输入输出时延设置',
            },
          ],
        },
        {
          key: '01',
          label: '射频采样设备',
          children: [
            {
              key: '0101',
              label: '控制指令',
            },
          ],
        },
        {
          key: '02',
          label: '抗干扰天线',
          children: [
            {
              key: '0201',
              label: '工作模式切换',
            },
            {
              key: '0202',
              label: '抗干扰算法加载头',
            },
            {
              key: '0203',
              label: '抗干扰算法加载数据包',
            },
          ],
        },
        {
          key: '03',
          label: '导航模拟器',
          children: [
            {
              key: '0301',
              label: '启动指令',
            },
            {
              key: '0302',
              label: '停止指令',
            },
          ],
        },
        {
          key: '04',
          label: '通用指令',
          children: [
            {
              key: '0401',
              label: '等待指令',
            },
            {
              key: '0402',
              label: '等待回执',
            },
          ],
        },
      ],
      // 左边菜单默认props
      menuDefaultProps: {
        children: 'children',
        label: 'label',
      },
      // 中间表单部分切换展示状态控制
      judge_show0001: false,
      judge_show0002: false,
      judge_show0003: false,
      judge_show0004: false,
      judge_show0101: false,
      judge_show0201: false,
      judge_show0202: false,
      judge_show0203: false,
      judge_show0301: false,
      judge_show0302: false,
      judge_show0401: false,
      judge_show0402: false,
      // 右边命令集列表展示状态控制
      cmdListShowState: false,
      // 中间表单组件props(formData属性)数据
      formData: {},
      // 中间表单组件props(formIndex属性)数据
      formIndex: 0,
      //中间表单组件状态 Boolean true 新增 false 修改
      formState: true,
      // 射频采样设备->控制指令表单数据
      rfFormData: {
        facilityValue: '01', //设备
        sampling: '01', //采样频点
        midBandFrequency1: '', //频率1
        midBandFrequency2: '', //频率2
        /**
         * 通道号状态
         *
         * @param number  通道号索引
         * @param state 通道号状态 0：开启 1：关闭
         */
        sapmlingOpenWay: [
          { number: 1, state: '0' },
          { number: 2, state: '0' },
          { number: 3, state: '0' },
          { number: 4, state: '0' },
          { number: 5, state: '0' },
          { number: 6, state: '0' },
          { number: 7, state: '0' },
          { number: 8, state: '0' },
          { number: 9, state: '0' },
          { number: 10, state: '0' },
          { number: 11, state: '0' },
          { number: 12, state: '0' },
          { number: 13, state: '0' },
          { number: 14, state: '0' },
          { number: 15, state: '0' },
          { number: 16, state: '0' },
          { number: 17, state: '0' },
          { number: 18, state: '0' },
          { number: 19, state: '0' },
          { number: 20, state: '0' },
          { number: 21, state: '0' },
          { number: 22, state: '0' },
          { number: 23, state: '0' },
          { number: 24, state: '0' },
        ],
      },
      // 抗干扰天线->工作模式切换
      workPatternFormData: {
        facilityValue: '01', //设备
        workValue: '', //工作模式
      },
      // 抗干扰天线->抗干扰算法加载头
      loadHeadFormData: {
        facilityValue: '01', //选择设备
        moduleId: '', //模块号
        fileTotalPackage: '', //文件总包数
        fileTotalByte: '', //文件总字节数
      },
      // 抗干扰天线->抗干扰算法加载数据包
      loadStateFormData: {
        facilityValue: '01', //选择设备
        moduleId: '', //模块号
        fileTotalPackage: '', //文件总包数
        fileTotalByte: '', //文件总字节数
        currentTotalPackage: '', //当前包数
        fileContentCheckSum: '', //文件内容校验和
      },
      //导航模拟器=>启动指令
      startFormData: {
        facilityValue: '01', //选择设备
      },
      //导航模拟器->停止指令
      ceaseFormData: {
        facilityValue: '01', //选择设备
      },
      //通用指令->等待指令
      waitFormData: {
        facilityValue: '01', //选择设备
        waitValue: '', //等待时间
      },
      //通用指令->等待回执
      waitBackValueFormData: {
        waitBackValue: true,
      },
      // 右边命令集数据集合
      cmdList: [],
      // 表单数据所属菜单对象 有无用 未知
      missionName: {
        children: [], //子菜单
        key: '01', //菜单组件索引
        label: '射频采样设备', //菜单名称
      },
    }
  },
  //未知
  model: {
    prop: 'show',
    event: 'closeDlg',
  },
  props: {
    show: Boolean,
  },
  methods: {
    //使用方法未知（待查文档）
    // 菜单组件children方法
    onChildren() {
      background = 'red'
    },
    //使用方法未知（待查文档）
    // el-dialog组件 before-close方法
    handleClose() {
      this.$emit('closeDlg', false)
    },
    /**
     * 表单组件数据提交
     *
     * @param data  表单数据 Object
     * @param index 表单数据索引 null||Number null:新增数据 Number:数据索引
     */
    submit(data, index) {
      console.log('提交的表单数据：')
      console.log(data)
      console.log(index)
      let cmdItem = {
        ...data,
        missionName: this.missionName,
      }
      // 修改表单数据
      if (!this.formState) {
        console.log('修改表单数据')
        this.cmdList[index] = cmdItem
      } else {
        //新增表单数据
        console.log('新增表单数据')
        this.cmdList.push(cmdItem)
      }

      console.log('新建场景页面表单提交后命令集数据集合为:')
      console.log(this.cmdList)
      // 初始化表单
      this.initForm()
    },
    // 初始化表单
    initForm() {
      console.log('初始化表单')
      // 1.将表单状态改为新增
      this.formState = true
      // 2.将表单数据初始化
      this.changeForm(this.missionName)
    },
    // 删除cmdList项
    cmdItemRemove(index) {
      console.log('新建场景页面删除数据索引：', index)
      this.cmdList.splice(index, 1)
      console.log('新建场景页面删除cmdList项后命令集数据集合为:')
      console.log(this.cmdList)
      // 初始化表单
      this.initForm()
    },
    /**
     * 修改CMDList项
     */
    cmdItemEdit(index) {
      console.log('新建场景页面修改数据索引：', index)
      console.log(this.cmdList)
      this.missionName = this.cmdList[index].missionName
      // 调用中间表单切换方法
      // 下边两行顺序不能变
      this.changeForm(this.missionName)
      this.formData = this.cmdList[index]
      this.formIndex = index
      this.formState = false
      console.log(this.formData)
    },
    /**
     * Tree 树组件的点击事件
     */
    handleNodeClick(data) {
      // console.log('点击菜单')
      // console.log('菜单数据：')
      // console.log(data)
      this.changeForm(data)
      // 每次切换菜单都将表单切换成添加命令状态
      this.formState = true
      this.missionName = data
    },
    /**
     * 切换中间表单的方法
     */
    changeForm(data) {
      // 中间表单切换展示状态
      this.judge_show0001 = false
      this.judge_show0002 = false
      this.judge_show0003 = false
      this.judge_show0004 = false
      this.judge_show0101 = false
      this.judge_show0201 = false
      this.judge_show0202 = false
      this.judge_show0203 = false
      this.judge_show0301 = false
      this.judge_show0302 = false
      this.judge_show0401 = false
      this.judge_show0402 = false
      // 右边命令集展示状态
      this.cmdListShowState = false
      if (data.key == '0001') {
        this.judge_show0001 = true
        this.cmdListShowState = true
      } else if (data.key == '0002') {
        this.judge_show0002 = true
        this.cmdListShowState = true
      } else if (data.key == '0003') {
        this.judge_show0003 = true
        this.cmdListShowState = true
      } else if (data.key == '0004') {
        this.judge_show0004 = true
        this.cmdListShowState = true
      } else if (data.key == '0101') {
        this.judge_show0101 = true
        this.cmdListShowState = true
        this.formData = { ...this.rfFormData }
      } else if (data.key == '0201') {
        this.judge_show0201 = true
        this.cmdListShowState = true
        this.formData = { ...this.workPatternFormData }
      } else if (data.key == '0202') {
        this.judge_show0202 = true
        this.cmdListShowState = true
        this.formData = { ...this.loadHeadFormData }
      } else if (data.key == '0203') {
        this.judge_show0203 = true
        this.cmdListShowState = true
        this.formData = { ...this.loadStateFormData }
      } else if (data.key == '0301') {
        this.judge_show0301 = true
        this.cmdListShowState = true
        this.formData = { ...this.startFormData }
      } else if (data.key == '0302') {
        this.judge_show0302 = true
        this.cmdListShowState = true
        this.formData = { ...this.ceaseFormData }
      } else if (data.key == '0401') {
        this.judge_show0401 = true
        this.cmdListShowState = true
        this.formData = { ...this.waitFormData }
      } else if (data.key == '0402') {
        this.judge_show0402 = true
        this.cmdListShowState = true
        this.formData = { ...this.waitBackValueFormData }
      }
    },
    // 获取commandId
    // val:command名称 String
    commandId(val) {
      console.log('commandId func')
      console.log('param: val')
      console.log(val)
      // switch (val) {
      //   case '射频采样控制指令':
      //     return 1
      //     break
      //   case '抗干扰工作模式切换':
      //     return 2
      //     break
      //   case '抗干扰算法加载文件头':
      //     return 3
      //     break
      //   case '抗干扰算法加载数据包':
      //     return 4
      //     break
      //   case '导航模拟器启动':
      //     return 5
      //     break
      //   case '导航模拟器停止':
      //     return 6
      //     break
      //   case '停止任务':
      //     return 7
      //     break
      //   case '设置监测任务':
      //     return 8
      //     break
      //   case '设置单频测量任务':
      //     return 9
      //     break
      //   default:
      //     break
      // }
      if (val == '射频采样控制指令') {
        return 1
      } else if (val == '抗干扰工作模式切换') {
        return 2
      } else if (val == '抗干扰算法加载文件头') {
        return 3
      } else if (val == '抗干扰算法加载数据包') {
        return 4
      } else if (val == '导航模拟器启动') {
        return 5
      } else if (val == '导航模拟器停止') {
        return 6
      } else if (val == '停止任务') {
        return 7
      } else if (val == '设置监测任务') {
        return 8
      } else if (val == '设置单频测量任务') {
        return 9
      } else {
        return
      }
    },
    // 保存
    async save() {
      console.log('保存命令：')
      console.log('cmdList：')
      console.log(this.cmdList)
      if (this.cmdList.length <= 0) {
        this.$message.error('请添加指令')
      }
      let commandGroupList = this.cmdList.map((item) => {
        return {
          command: JSON.stringify(item),
          commandId: this.commandId(item.orderName),
          orderType: this.commandId(item.orderName) < 7 ? 0 : 1,
          receiverId: Number(item.receiver),
        }
      })
      let apiData = {
        commandGroupList,
        sceneName: this.sceneName,
      }
      console.log('apiData:')
      console.log(apiData)

      let res = await saveCommand(apiData)
      console.log('saveCommand res:')
      console.log(res)
    },
  },
}
</script>
<style lang="scss" scoped>
* {
  padding-top: 0;
}
.buju1 {
  height: 500px;
  margin-left: 15px;
  background-color: rgba(8, 51, 85, 0.3);
}
.buju2 {
  height: 100%;
}
.theme-dialog {
  height: 74%;
  bottom: 25px;
}
.center {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
::v-deep .el-dialog--center .el-dialog__body {
  padding: 0px 25px 20px;
}
::v-deep.select .el-tree {
  background-color: rgba(8, 51, 85, 0);
  color: #fff;
}
::v-deep.select .el-tree-node__content:hover {
  background-color: rgba(7, 185, 170, 1);
}
::v-deep .el-tree-node:focus > .el-tree-node__content {
  background-color: rgba(7, 185, 170, 1);
}
.btn {
  margin-top: 15px;
  text-align: center;
}
.theme-button {
  width: 152px;
  height: 35px;
  margin-left: 15px;
  font-size: 16px;
}
</style>
