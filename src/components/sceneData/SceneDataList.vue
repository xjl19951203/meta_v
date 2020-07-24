<template>
  <el-container class="SceneDataList">
    <el-header>
      <el-card class="hover">
        <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-row :gutter="20">
<!--          <el-col :span="16">-->
<!--            <el-form class="searchForm" ref="searchForm" :model="searchForm" :rules="searchRules">-->
<!--              <el-form-item prop="content">-->
<!--                <el-input class="input-with-select" placeholder="搜索工艺场景" v-model="searchForm.content">-->
<!--                  <el-button slot="append" icon="el-icon-search"></el-button>-->
<!--                </el-input>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--          </el-col>-->
          <el-col :span="16">
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
      </el-card>
      <el-divider></el-divider>
    </el-header>
    <el-main>
      <el-table
        :data="sceneDataList.filter(data => !searchForm.content || data.title.toLowerCase().includes(searchForm.content.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="工艺分类"
          width="120">
          <template slot-scope="scope">
            {{scope.row['category']['title']}}
          </template>
        </el-table-column>
        <el-table-column
          label="工艺名称"
          width="200">
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
          sortable
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <span style="margin-left: 10px">创建时间：{{ scope.row['createdAt'] }}</span>
              <span style="margin-left: 10px">更新时间：{{ scope.row['updatedAt'] }}</span>
            </el-popover>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row['createdAt'] }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
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
        :page-size="categoryRes.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="categoryRes.count">
      </el-pagination>
    </el-footer>
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
      postSceneRules: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // let categoryId = to.query['category'] ? to.query['category'] : 1
      let query = {
        categoryId: to.query['category'] ? to.query['category'] : 1,
        currentPage: to.query['currentPage'] ? to.query['currentPage'] : 1,
        pageSize: to.query['pageSize'] ? to.query['pageSize'] : 5
      }
      if (to.params['sceneDataList'] !== undefined) {
        vm.sceneDataList = to.params['sceneDataList']
      } else if (localStorage.getItem('sceneDataList') !== undefined) {
        vm.sceneDataList = JSON.parse(localStorage.getItem('sceneDataList'))
        console.log(vm.sceneDataList)
        localStorage.removeItem('sceneDataList')
      } else {
        let args = {
          url: 'category/',
          params: query
        }
        api.get(args).then(res => {
          vm.categoryRes = res
          vm.sceneDataList = res['data']
          console.log(vm.sceneDataList)
        })
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    // let categoryId = to.query['category'] ? to.query['category'] : 1
    let query = {
      categoryId: to.query['category'] ? to.query['category'] : 1,
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
      console.log(this.sceneDataList)
    })
    next()
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      let routeQuery = this.$route['query']
      let categoryId = routeQuery['category'] ? routeQuery['category'] : 1
      let query = {
        currentPage: val,
        pageSize: routeQuery['pageSize'] ? routeQuery['pageSize'] : 5
      }
      let args = {
        url: 'category/' + categoryId,
        params: query
      }
      api.get(args).then(res => {
        this.categoryRes = res
        this.sceneDataList = res['data']
        console.log(this.sceneDataList)
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
  }
</style>
