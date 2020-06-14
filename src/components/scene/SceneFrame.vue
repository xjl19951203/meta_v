<template>
  <div class="SceneFrame">
    <div class="Wrapper">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="tabPaneList[0].label" name="first">
          <Pane :list="frame['materialDataList']" :label="tabPaneList[0].label" :tableName="tabPaneList[0].tableName"></Pane>
        </el-tab-pane>
        <el-tab-pane :label="tabPaneList[1].label" name="second">
          <Pane :list="frame['deviceDataList']" :label="tabPaneList[1].label" :tableName="tabPaneList[1].tableName"></Pane>
        </el-tab-pane>
        <el-tab-pane :label="tabPaneList[2].label" name="third">
          <Pane :list="frame['energyDataList']" :label="tabPaneList[2].label" :tableName="tabPaneList[2].tableName"></Pane>
        </el-tab-pane>
        <el-tab-pane :label="tabPaneList[3].label" name="fourth">
          <Pane :list="frame['keyParameterDataList']" :label="tabPaneList[3].label" :tableName="tabPaneList[3].tableName"></Pane>
        </el-tab-pane>
        <el-tab-pane :label="tabPaneList[4].label" name="fifth">
          <Pane :list="frame['functionUnitDataList']" :label="tabPaneList[4].label" :tableName="tabPaneList[4].tableName"></Pane>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import api from 'api'
import Pane from './widgets/Pane'
export default {
  name: 'SceneFrame',
  components: {
    Pane
  },
  data () {
    return {
      activeName: 'first',
      frame: {},
      tabPaneList: [
        {
          label: '物料数据',
          name: '1',
          tableName: 'materialData'
        },
        {
          label: '能源数据',
          name: '2',
          tableName: 'energyData'
        },
        {
          label: '关键工艺参数',
          name: '3',
          tableName: 'materialData'
        },
        {
          label: '设备数据',
          name: '4',
          tableName: 'deviceData'
        },
        {
          label: '环境负荷数据',
          name: '5',
          tableName: 'envLoadData'
        }
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let inputFrameId = to.params['inputFrameId']
      let args = {
        url: 'manage/inputFrame/' + inputFrameId
      }
      api.get(args).then(res => {
        vm.frame = res
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
    let inputFrameId = to.params['inputFrameId']
    let args = {
      url: 'manage/inputFrame/' + inputFrameId
    }
    api.get(args).then(res => {
      this.frame = res
    })
    next()
  }
}
</script>
<style scoped>

</style>
