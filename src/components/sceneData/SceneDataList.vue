<template>
  <el-container class="SceneDataList">
    <div style="margin:0 6px">
      <el-row :gutter="12" class="hover">
        <el-col :span="15">
          <el-input class="input-with-select" placeholder="搜索工艺场景" v-model="searchForm.content">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <el-button type="primary" @click="postSceneDrawer=true">
            <i class="el-icon-circle-plus-outline"></i>新增工艺场景
          </el-button>     <!--以弹窗（drawer抽屉）的形式新增工艺场景-->
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </div>
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
        :total="categoryRes.count"
        :disabled="pageVisible">
      </el-pagination>
    </el-footer>
    <el-drawer
      class="manageEditDrawer"
      title="新增工艺场景"
      :visible.sync="postSceneDrawer"
      :direction="'rtl'"
      :size="'50%'">
      <div style="max-height:700px;overflow-y:auto;">
        <el-form ref="postSceneForm" v-model="postSceneForm" label-width="150px">
          <el-row>
            <el-tag class="title" type="success">场景基本信息</el-tag>
          </el-row>
          <el-form-item label="场景名称" prop="title">
            <el-col :span="20">
              <el-input v-model="postSceneForm.title"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="场景描述" prop="description">
            <el-col :span="20">
              <el-input type="textarea" autosize v-model="postSceneForm.description"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="场景分类" prop="categoryId">
            <el-cascader
              v-model="postCategoryList"
              clearable
              :options="categories"
              :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'title', value: 'id' }">
            </el-cascader>  <!--级联选择器，选择场景分类，三级场景分类-->
          </el-form-item>
          <el-row>
            <el-tag class="title" type="primary">场景物料种类</el-tag>
          </el-row>
          <el-form-item label="所用物料" prop="materialDataList">
            <el-select v-model="postSceneForm.materialDataList" multiple placeholder="请选择">
              <el-option
                v-for="item in materialOptions"
                :key="item.index"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <el-tag class="title" type="warning">场景设备种类</el-tag>
          </el-row>
          <el-form-item label="所用设备" prop="deviceDataList">
            <el-select v-model="postSceneForm.deviceDataList" multiple placeholder="请选择">
              <el-option
                v-for="item in deviceOptions"
                :key="item.index"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <el-tag class="title" type="info">场景关键工艺参数</el-tag>
          </el-row>
          <el-form-item label="关键工艺参数" prop="keyParameterDataList">
            <el-col :span="20">
              <el-input v-model="postSceneForm.keyParameterDataList[0]" placeholder="请填写"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button size="small" type="info" icon="el-icon-plus" @click="addItem"></el-button>
            </el-col>
          </el-form-item>
          <div v-for="(item, index) in postSceneForm.keyParameterDataList" :key="index">
            <el-form-item label="关键工艺参数" v-if="index !== 0">
              <el-col :span="20">
                <el-input v-model="postSceneForm.keyParameterDataList[index]" placeholder="请填写"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button size="small" type="info" icon="el-icon-delete" @click="deleteItem(item, index)"></el-button>
              </el-col>
            </el-form-item>
          </div>
          <el-row>
            <el-button type="primary" @click="handlePost('postSceneForm')" class="buttonType">立即创建</el-button>
          </el-row>  <!--点击创建调用提交方法handlePost-->
        </el-form>
      </div>
    </el-drawer>
  </el-container>
</template>
<script>
import api from 'api'
export default {
  name: 'SceneDataList',
  computed: {
    categories () {
      return this.$store.state.categories[0].children
    },
    materialOptions () {
      return this.$store.state.baseTableMap['material']
    },
    deviceOptions () {
      return this.$store.state.baseTableMap['device']
    }
  },
  data () {
    return {
      pageVisible: true,
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
        categoryId: 1,
        materialDataList: [],
        deviceDataList: [],
        keyParameterDataList: []
      },
      postSceneRules: {},
      addScene: false
      // sceneDataForm: {
      //   title: '',
      //   categoryId: '',
      //   categoryRootId: '',
      //   description: ''
      // },
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // let categoryId = to.query['categoryId'] ? to.query['categoryId'] : 1
      let query = {
        categoryId: to.query['categoryId'] ? to.query['categoryId'] : 1,
        currentPage: to.query['currentPage'] ? to.query['currentPage'] : 1,
        pageSize: to.query['pageSize'] ? to.query['pageSize'] : 7
      }
      if (to.params['sceneDataList'] !== undefined) {
        vm.sceneDataList = to.params['sceneDataList']
      } else if (localStorage.getItem('sceneDataList') !== undefined) {
        vm.sceneDataList = JSON.parse(localStorage.getItem('sceneDataList'))
        localStorage.removeItem('sceneDataList')
        vm.pageVisible = false
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
      pageSize: to.query['pageSize'] ? to.query['pageSize'] : 7
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
      this.$refs['postSceneForm'].validate((valid) => {
        if (valid) {
          this.postSceneForm.categoryId = this.postCategoryList[this.postCategoryList.length - 1]
          this.postSceneForm.categoryRootId = this.postCategoryList[1] // 二级分类ID
          // api.post({url: 'sceneData', params: this.postSceneForm}).then(result => {
          //   if (result > 0) {
          //     this.$router.push({name: 'SceneData', params: {sceneId: result}})
          //   } else {
          //     this.$message.error('出错了！')
          //   }
          // })
        } else {
          this.$message.error('请填写所有必填项')
        }
      })
    },
    addItem () {
      this.postSceneForm.keyParameterDataList.push('')
    },
    deleteItem (item, index) {
      this.postSceneForm.keyParameterDataList.splice(index, 1)
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
    .title{
      display: inline-block;
      font-weight: bolder;
      font-size: large;
      padding: 0 10px;
      margin: 0 0 0 10px;
    }
    .buttonType{
      display: inline-block;
      font-weight: bolder;
      font-size: larger;
      margin: 10px 20px 20px 370px;
    }
  }
</style>
