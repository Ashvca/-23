<template>
  <div class="scene-list-container">
    <card
      title="自定义的场景"
      :icon="require('@/assets/view/scene-list-container.png')"
    >
      <el-button
        class="theme-button"
        type="primary"
        style="position: relative; bottom: 40px; left: 1770px; margin: 0ox"
        @click="handleClick"
        >创建新任务</el-button
      >
      <establish-dialog v-model="show"></establish-dialog>
      <!-- 卡片列表 -->
      <div style="position: relative; top: -20px">
        <el-row>
          <el-col v-for="item in cardList" :key="item.id" :span="6">
            <el-card>
              <!-- 编辑、删除 -->
              <div class="button">
                <span style="margin: 0px 12px">
                  <i
                    class="el-icon-more"
                    style="font-size: 28px; color: #fff"
                  ></i>
                </span>
                <div class="xianshi">
                  <li>
                    <div class="edit" @click="edit">编辑</div>
                  </li>
                  <li>
                    <div class="edit" @click="dele">删除</div>
                  </li>
                </div>
              </div>
              <!-- 中间内容 -->
              <div class="title">{{ item.title }}</div>
              <div class="header">{{ item.header }}</div>
              <div class="body">
                {{ item.body }}
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- 分页组件 -->
        <div class="block">
          <el-pagination
            class="theme-pagination"
            style="float: right; margin: 4px"
            popper-class="theme-popper"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import Card from '../../components/Card.vue'
import establishDialog from '@/views/scene-list/components/establish-dialog'
export default {
  name: 'SceneList',
  components: { Card, establishDialog },
  data() {
    return {
      currentPage: 1,
      modal: true,
      cardList: [
        {
          id: 1,
          title: '自定义场景名称',
          header: '创建时间：2021-10-10 15:00:00',
          body: '设备种类：导航终端、自适应抗干扰天线、信号接收处理设备、多模复合导航信号模拟器-单星/合路、射频采样设备',
        },
        {
          id: 2,
          title: '自定义场景名称',
          header: '创建时间：2021-10-10 15:00:00',
          body: '设备种类：导航终端、自适应抗干扰天线、信号接收处理设备、多模复合导航信号模拟器-单星/合路、射频采样设备',
        },
        {
          id: 3,
          title: '自定义场景名称',
          header: '创建时间：2021-10-10 15:00:00',
          body: '设备种类：导航终端、自适应抗干扰天线、信号接收处理设备、多模复合导航信号模拟器-单星/合路、射频采样设备',
        },
        {
          id: 4,
          title: '自定义场景名称',
          header: '创建时间：2021-10-10 15:00:00',
          body: '设备种类：导航终端、自适应抗干扰天线、信号接收处理设备、多模复合导航信号模拟器-单星/合路、射频采样设备',
        },
        {
          id: 5,
          title: '自定义场景名称',
          header: '创建时间：2021-10-10 15:00:00',
          body: '设备种类：导航终端、自适应抗干扰天线、信号接收处理设备、多模复合导航信号模拟器-单星/合路、射频采样设备',
        },
        {
          id: 6,
          title: '自定义场景名称',
          header: '创建时间：2021-10-10 15:00:00',
          body: '设备种类：导航终端、自适应抗干扰天线、信号接收处理设备、多模复合导航信号模拟器-单星/合路、射频采样设备',
        },
        {
          id: 7,
          title: '自定义场景名称',
          header: '创建时间：2021-10-10 15:00:00',
          body: '设备种类：导航终端、自适应抗干扰天线、信号接收处理设备、多模复合导航信号模拟器-单星/合路、射频采样设备',
        },
        {
          id: 8,
          title: '自定义场景名称',
          header: '创建时间：2021-10-10 15:00:00',
          body: '设备种类：导航终端、自适应抗干扰天线、信号接收处理设备、多模复合导航信号模拟器-单星/合路、射频采样设备',
        },
        {
          id: 9,
          title: '自定义场景名称',
          header: '创建时间：2021-10-10 15:00:00',
          body: '设备种类：导航终端、自适应抗干扰天线、信号接收处理设备、多模复合导航信号模拟器-单星/合路、射频采样设备',
        },
        {
          id: 10,
          title: '自定义场景名称',
          header: '创建时间：2021-10-10 15:00:00',
          body: '设备种类：导航终端、自适应抗干扰天线、信号接收处理设备、多模复合导航信号模拟器-单星/合路、射频采样设备',
        },
        {
          id: 11,
          title: '自定义场景名称',
          header: '创建时间：2021-10-10 15:00:00',
          body: '设备种类：导航终端、自适应抗干扰天线、信号接收处理设备、多模复合导航信号模拟器-单星/合路、射频采样设备',
        },
        {
          id: 12,
          title: '自定义场景名称',
          header: '创建时间：2021-10-10 15:00:00',
          body: '设备种类：导航终端、自适应抗干扰天线、信号接收处理设备、多模复合导航信号模拟器-单星/合路、射频采样设备',
        },
        {
          id: 13,
          title: '自定义场景名称',
          header: '创建时间：2021-10-10 15:00:00',
          body: '设备种类：导航终端、自适应抗干扰天线、信号接收处理设备、多模复合导航信号模拟器-单星/合路、射频采样设备',
        },
        {
          id: 14,
          title: '自定义场景名称',
          header: '创建时间：2021-10-10 15:00:00',
          body: '设备种类：导航终端、自适应抗干扰天线、信号接收处理设备、多模复合导航信号模拟器-单星/合路、射频采样设备',
        },
        {
          id: 15,
          title: '自定义场景名称',
          header: '创建时间：2021-10-10 15:00:00',
          body: '设备种类：导航终端、自适应抗干扰天线、信号接收处理设备、多模复合导航信号模拟器-单星/合路、射频采样设备',
        },
        {
          id: 16,
          title: '自定义场景名称',
          header: '创建时间：2021-10-10 15:00:00',
          body: '设备种类：导航终端、自适应抗干扰天线、信号接收处理设备、多模复合导航信号模拟器-单星/合路、射频采样设备',
        },
      ],
      show: false,
    }
  },
  watch: {
    show(newVal) {
      console.log(newVal)
    },
  },
  methods: {
    edit() {
      console.log('编辑')
    },
    dele() {
      console.log('删除')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleClick() {
      this.show = true
    },
  },
}
</script>
<style lang="scss" scoped>
.scene-list-container {
  height: 100%;
  width: 100%;
  & > .card {
    width: 100%;
    height: 100%;
    .el-card {
      width: 392px;
      height: 200px;
      margin: 0.8vh auto;
      background-color: #105387;
      border: 1px solid;
      border-color: #0e94f3;
      box-shadow: 0px 0px 14px rgba(23, 191, 253, 0.5) inset;
      li {
        list-style: none;
      }
      .button {
        width: 54px;
        height: 26px;
        margin-top: -6%;
        margin-left: 91%;
        position: relative;
        background-color: #2aa1fd;
        border-radius: 0px 2px 0px 0px;
      }
      .xianshi {
        width: 54px;
        height: 46px;
        background-color: #2aa1fd;
        position: absolute;
        top: 26px;
        display: none;
        .edit {
          color: #ffffff;
          text-align: center;
          cursor: pointer;
        }
        .edit:hover {
          color: #07b9aa;
        }
      }
      .button:hover > .xianshi {
        display: block;
      }
      .title {
        font-weight: 700;
        color: #07b9aa;
        font-size: 20px;
      }
      .header {
        color: #bce1fe;
        font-size: 14px;
        margin-top: 3%;
      }
      .body {
        width: 88%;
        color: #bce1fe;
        font-size: 14px;
        line-height: 20px;
        margin-top: 3%;
      }
    }
  }
}
</style>
