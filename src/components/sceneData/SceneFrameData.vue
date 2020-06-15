<template>
  <div class="SceneFrameData">
    <div class="Wrapper">
      <el-radio-group v-model="outputIndex" size="small">
        <el-radio-button :label="index" v-for="(item, index) in frame['outputFrameDataList']" :key="index">
          {{item['collectionDescription']}}
        </el-radio-button>
      </el-radio-group>
      <el-divider></el-divider>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="tabPaneList[0].label" name="1">
          <Pane :list="frame['materialDataList']" :label="tabPaneList[0].label" :tableName="tabPaneList[0].tableName"></Pane>
        </el-tab-pane>
        <el-tab-pane :label="tabPaneList[1].label" name="2">
          <Pane :list="frame['deviceDataList']" :label="tabPaneList[1].label" :tableName="tabPaneList[1].tableName"></Pane>
        </el-tab-pane>
        <el-tab-pane :label="tabPaneList[2].label" name="3">
          <Pane :list="frame['energyDataList']" :label="tabPaneList[2].label" :tableName="tabPaneList[2].tableName"></Pane>
        </el-tab-pane>
        <el-tab-pane :label="tabPaneList[3].label" name="4">
          <Pane :list="frame['keyParameterDataList']" :label="tabPaneList[3].label" :tableName="tabPaneList[3].tableName"></Pane>
        </el-tab-pane>
        <el-tab-pane :label="tabPaneList[4].label" name="5">
          <Pane :list="frame['functionUnitDataList']" :label="tabPaneList[4].label" :tableName="tabPaneList[4].tableName"></Pane>
        </el-tab-pane>
        <el-tab-pane :label="tabPaneList[5].label" name="6">
          <Pane :list="frame['outputFrameDataList'][outputIndex]['envLoadDataList']" :label="tabPaneList[5].label" :tableName="tabPaneList[5].tableName"></Pane>
        </el-tab-pane>
        <el-tab-pane :label="tabPaneList[6].label" name="7">
          <Pane :list="frame['outputFrameDataList'][outputIndex]['outputPartDataList']" :label="tabPaneList[6].label" :tableName="tabPaneList[6].tableName"></Pane>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import api from 'api'
import Pane from './widgets/Pane'
export default {
  name: 'SceneFrameData',
  components: {
    Pane
  },
  data () {
    return {
      activeName: '1',
      outputIndex: 0,
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
          label: '功能单位',
          name: '5',
          tableName: 'functionUnitData'
        },
        {
          label: '环境负荷',
          name: '6',
          tableName: 'envLoadData'
        },
        {
          label: '输出部件',
          name: '7',
          tableName: 'outputPartData'
        }
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let inputFrameDataId = to.params['inputFrameDataId']
      let args = {
        url: 'manage/inputFrameData/' + inputFrameDataId
      }
      api.get(args).then(res => {
        vm.frame = res
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
    let inputFrameDataId = to.params['inputFrameDataId']
    let args = {
      url: 'manage/inputFrameData/' + inputFrameDataId
    }
    api.get(args).then(res => {
      this.frame = res
    })
    next()
  },
  methods: {
    handleClick (index) {
      this.outputIndex = index
    }
  }
}
</script>
<style scoped>

</style>
