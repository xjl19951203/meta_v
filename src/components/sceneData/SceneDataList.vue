<template>
  <el-container class="SceneDataList">
    <el-header>
      <el-row :gutter="12" class="hover">
        <el-col :span="15">
          <el-input class="input-with-select" placeholder="搜索工艺场景" v-model="searchForm.content">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8" style="text-align:right">
          <el-button type="primary" @click="postSceneDrawer=true">
            <i class="el-icon-circle-plus-outline"></i> 新增工艺场景
          </el-button>     <!--以弹窗（drawer抽屉）的形式新增工艺场景-->
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </el-header>
    <el-main>
      <el-table
        :data="sceneDataList.filter(data => !searchForm.content || data.title.toLowerCase().includes(searchForm.content.toLowerCase()))"
        style="width: 100%"
        >
        <el-table-column
          label="工艺分类"
          width="120">
          <template slot-scope="scope">
            {{scope.row['category']['title']}}
          </template>
        </el-table-column>
        <el-table-column
          label="工艺名称"
          width="170">
          <template slot-scope="scope">
            {{scope.row['title']}}
          </template>
        </el-table-column>
        <el-table-column
          label="场景描述"
          width="200">
          <template slot-scope="scope">
            {{scope.row['description']}}
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="100">
          <template slot-scope="scope">
            {{ scope.row['createdAt'] }}
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          width="100">
          <template slot-scope="scope">
            {{ scope.row['updatedAt'] }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDetailDrawer(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="categoryRes.currentPage"
        :page-sizes="[5, 7, 10]"
        :page-size="categoryRes.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="categoryRes.count">
      </el-pagination>
    </el-footer>
    <el-drawer
      class="manageEditDrawer"
      title="新增工艺场景"
      :visible.sync="postSceneDrawer"
      :direction="'rtl'"
      :size="'50%'">
      <el-form ref="sceneDataForm" v-model="sceneDataForm" label-width="150px">
        <el-form-item v-for="item in tableColumns" :key="item.index" :prop="item['columnName']"
                      :label="item['columnComment']" v-show="item['columnName'] !== 'id'">
          <el-input v-if="item['columnKey'] !== 'MUL'" v-model="sceneDataForm[item['columnName']]"
                    :type="item['dataType'] === 'int' ? 'number' : 'textarea'">
          </el-input>
          <el-select v-if="item['columnKey'] === 'MUL'"  v-model="editForm[item['columnName']]" filterable placeholder="请选择">
            <el-option
              v-for="item in baseTableMap[item['columnName'].substring(0, item['columnName'].length - 2)]"
              :key="item.id"
              :label="item['title']"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleSubmit">
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </el-container>
</template>
<script>
import api from 'api'
export default {
  name: 'SceneDataList',
  data () {
    return {
      postCategoryList: [],
      selectScene: {
        category: {}
      },
      categoryId: null,
      searchForm: {
        content: '',
        category: '',
        selectCategoryId: null
      },
      searchRules: {},
      categoryRes: {
        count: 1,
        currentPage: 1,
        pages: 1,
        pageSize: 1,
        data: [],
        category: {}
      },
      sceneDataList: [],
      postSceneDrawer: false,
      postSceneForm: {
        title: '',
        description: '',
        categoryId: 1
      },
      postSceneRules: {},
      addScene: false,
      sceneDataForm: {
        title: '',
        categoryId: '',
        categoryRootId: '',
        description: ''
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // let categoryId = to.query['categoryId'] ? to.query['categoryId'] : 1
      let query = {
        categoryId: to.query['categoryId'] ? to.query['categoryId'] : 1,
        currentPage: to.query['currentPage'] ? to.query['currentPage'] : 1,
        pageSize: to.query['pageSize'] ? to.query['pageSize'] : 5
      }
      if (to.params['sceneDataList'] !== undefined) {
        vm.sceneDataList = to.params['sceneDataList']
      } else if (localStorage.getItem('sceneDataList') !== undefined && localStorage.getItem('sceneDataList') !== null) {
        vm.sceneDataList = JSON.parse(localStorage.getItem('sceneDataList'))
        localStorage.removeItem('sceneDataList')
      } else {
        let args = {
          url: 'category/',
          params: query
        }
        api.get(args).then(res => {
          vm.categoryRes = res
          vm.sceneDataList = res['data']
        })
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    // let categoryId = to.query['category'] ? to.query['category'] : 1
    let query = {
      categoryId: to.query['categoryId'] ? to.query['categoryId'] : 1,
      currentPage: to.query['currentPage'] ? to.query['currentPage'] : 1,
      pageSize: to.query['pageSize'] ? to.query['pageSize'] : 5
    }
    let args = {
      // url: 'category/' + categoryId,
      url: 'category/',
      params: query
    }
    api.get(args).then(res => {
      this.categoryRes = res
      this.sceneDataList = res['data']
    })
    next()
  },
  methods: {
    handleSizeChange (val) {
      // let routeQuery = this.$route['query']
      let query = {
        categoryId: this.categoryId,
        currentPage: this.categoryRes.currentPage,
        pageSize: val
      }
      let args = {
        url: 'category/',
        params: query
      }
      api.get(args).then(res => {
        this.categoryRes = res
        this.sceneDataList = res['data']
      })
    },
    handleCurrentChange (val) {
      // let routeQuery = this.$route['query']
      let query = {
        categoryId: this.categoryId,
        currentPage: val,
        pageSize: this.categoryRes.pageSize
      }
      let args = {
        url: 'category/',
        params: query
      }
      api.get(args).then(res => {
        this.categoryRes = res
        this.sceneDataList = res['data']
        // console.log(this.sceneDataList)
      })
    },
    handleDetailDrawer (index, row) {
      this.$router.push({name: 'SceneData', params: {sceneDataId: row['id']}})
    },
    handlePost () {
      this.postSceneForm.categoryId = this.postCategoryList[this.postCategoryList.length - 1]
      this.postSceneForm.categoryRootId = this.postCategoryList[1] // 二级分类ID
      api.post({url: 'sceneData', params: this.postSceneForm}).then(result => {
        if (result > 0) {
          this.$router.push({name: 'SceneEdit', params: {sceneId: result}})
        } else {
          this.$message.error('出错了！')
        }
      })
    },
    handleSubmit () {
    },
    handlePut (index, row) {
      this.$router.push({name: 'SceneEdit', params: {sceneId: row.id}})
    }
  }
}
</script>
<style scoped lang="scss">
  .SceneDataList{
    height: 100%;
    max-height: 100%;
    .input-with-select{
      border-style: ridge;
      border-color: cornflowerblue;
      border-width: 5px
    }
    .hover {
      margin-top: 20px;
      padding: 0
    }
  }
</style>
