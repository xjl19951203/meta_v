<template>
  <el-container class="SceneData">
    <el-header>
      <SceneBasic :sceneData="sceneData"></SceneBasic>
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
              {{item['material']['title']}} ： {{item['value']}} {{item['unit']['title']}}
            </div>
          </template>
        </el-table-column>
          <el-table-column
          label="能源数据"
          width="180">
          <template slot-scope="scope">
            <div v-for="item in scope.row['energyDataList']" :key="item.index" class="text item">
              {{item['energy']['title']}} ： {{item['value']}} {{item['unit']['title']}}
            </div>
          </template>
        </el-table-column>
          <el-table-column
          label="设备数据"
          width="180">
          <template slot-scope="scope">
            <div v-for="item in scope.row['deviceDataList']" :key="item.index" class="text item">
              {{item['device']['title']}}
            </div>
          </template>
        </el-table-column>
          <el-table-column
          label="关键工艺参数"
          width="180">
          <template slot-scope="scope">
            <div v-for="item in scope.row['keyParameterDataList']" :key="item.index" class="text item">
              {{item['title']}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="功能单位"
          width="180">
          <template slot-scope="scope">
            <div v-for="item in scope.row['functionUnitDataList']" :key="item.index" class="text item">
              {{item['title']}}
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
                      {{item['envLoad']['title']}} ： {{item['value']}} {{item['unit']['title']}}
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
      sceneData: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let sceneDataId = to.params['sceneDataId']
      let args = {
        url: 'manage/sceneData/' + sceneDataId
      }
      api.get(args).then(res => {
        vm.sceneData = res
      })
    })
  },
  methods: {
    handleDetail (row) {
      let params = {
        sceneDataId: row.sceneDataId,
        inputFrameDataId: row.id
      }
      this.$router.push({name: 'SceneFrameData', params: params})
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
<style scoped>

</style>
