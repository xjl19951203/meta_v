<template>
  <el-container class="SceneData">
    <el-header>
        <SceneBasic :sceneData="sceneData"></SceneBasic>
        <el-button type="primary" @click="postInputFrame">新增输入帧</el-button>
      <el-divider></el-divider>
    </el-header>
    <el-main>
      <el-table
        :data="sceneData['inputFrameDataList']"
        style="width: 100%">
        <el-table-column
          label="物料数据"
          width="180">
          <template slot-scope="scope">
            <div v-for="item in scope.row['materialDataList']" :key="item.index" class="text item">
<!--              {{item['material']['title']}} ： {{item['value']}} {{item['unit']['title']}}-->
              {{item['material']?item['material']['title']:''}} ： {{item['value']?item['value']:''}} {{item['unit']?item['unit']['title']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="能源数据"
          width="180">
          <template slot-scope="scope">
            <div v-for="item in scope.row['energyDataList']" :key="item.index" class="text item">
<!--              {{item['energy']['title']}} ： {{item['value']}} {{item['unit']['title']}}-->
              {{item['energy']?item['energy']['title']:''}} ： {{item['value']?item['value']:''}} {{item['unit']?item['unit']['title']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="设备数据"
          width="180">
          <template slot-scope="scope">
            <div v-for="item in scope.row['deviceDataList']" :key="item.index" class="text item">
              {{item['device']?item['device']['title']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="关键工艺参数"
          width="180">
          <template slot-scope="scope">
            <div v-for="item in scope.row['keyParameterDataList']" :key="item.index" class="text item">
              {{item['title']?item['title']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="功能单位"
          width="180">
          <template slot-scope="scope">
            <div v-for="item in scope.row['functionUnitDataList']" :key="item.index" class="text item">
              {{item['title']?item['title']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popover
              placement="right"
              trigger="hover">
              <el-table :data="scope.row['outputFrameDataList']">
                <el-table-column
                  label="采集描述"
                  width="180">
                  <template slot-scope="scope">
                    {{scope.row['collectionDescription']}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="环境负荷"
                  width="180">
                  <template slot-scope="scope">
                    <div v-for="item in scope.row['envLoadDataList']" :key="item.index" class="text item">
                      {{item['envLoad']?item['envLoad']['title']:''}} ： {{item['value']}} {{item['unit']?item['unit']['title']:''}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="输出部件"
                  width="180">
                  <template slot-scope="scope">
                    <div v-for="item in scope.row['outputPartDataList']" :key="item.index" class="text item">
                      {{item['title']}}
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <el-button @click="handleDetail(scope.row)" slot="reference" size="mini">详情</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script>
import api from 'api'
import SceneBasic from './widgets/SceneBasic'
export default {
  name: 'SceneData',
  components: {
    SceneBasic
  },
  data () {
    return {
      sceneData: {},
      postInputFrameData: {
        sceneDataId: null,
        materialDataList: [],
        deviceDataList: [],
        keyParameterDataList: []
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let sceneDataId = to.params['sceneDataId']
      vm.postInputFrameData.materialDataList = []
      vm.postInputFrameData.deviceDataList = []
      vm.postInputFrameData.keyParameterDataList = []
      let args = {
        url: 'manage/sceneData/' + sceneDataId
      }
      api.get(args).then(res => {
        vm.sceneData = res
        vm.postInputFrameData.sceneDataId = vm.sceneData['id']
        if (vm.sceneData['inputFrameDataList'].length !== 0) {
          vm.sceneData['inputFrameDataList'][0]['materialDataList'].forEach((item) => {
            vm.postInputFrameData.materialDataList.push(item['materialId'])
          })
          console.log(vm.postInputFrameData.materialDataList)
          vm.sceneData['inputFrameDataList'][0]['deviceDataList'].forEach((item) => {
            vm.postInputFrameData.deviceDataList.push(item['deviceId'])
          })
          console.log(vm.postInputFrameData.deviceDataList)
          vm.sceneData['inputFrameDataList'][0]['keyParameterDataList'].forEach((item) => {
            vm.postInputFrameData.keyParameterDataList.push(item['title'])
          })
          console.log(vm.postInputFrameData.keyParameterDataList)
        }
      })
    })
  },
  methods: {
    handleDetail (row) {
      let params = {
        sceneDataId: row.sceneDataId,
        sceneData: this.sceneData,
        inputFrameDataId: row.id
      }
      this.$router.push({name: 'SceneFrameData', params: params})
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    postInputFrame () {
      if (this.sceneData['inputFrameDataList'].length !== 0) {
        let args = {
          url: 'manage/inputFrameData',
          params: this.postInputFrameData
        }
        // console.log(this.postInputFrameData)
        api.post(args).then(res => {
          if (res > 0) {
            // this.postInputFrameData = null
            history.go(0)
          } else {
            alert('新增失败！！！')
          }
        })
      } else {
        let args = {
          url: 'manage/inputFrameData',
          params: this.postInputFrameData
        }
        api.post(args).then(res => {
          if (res > 0) {
            let params = {
              sceneDataId: this.sceneData['id'],
              sceneData: this.sceneData,
              inputFrameDataId: res
            }
            this.$router.push({name: 'SceneFrameData', params: params})
          } else {
            alert('新增失败！！！')
          }
        })
      }
    }
  }
}
</script>
<style scoped>

</style>
