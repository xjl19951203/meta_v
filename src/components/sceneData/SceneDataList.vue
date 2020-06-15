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
          <el-col :span="16">
            <el-form class="searchForm" ref="searchForm" :model="searchForm" :rules="searchRules">
              <el-form-item prop="content">
                <el-input placeholder="搜索工艺场景" v-model="searchForm.content" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-form-item>
            </el-form>
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
        :data="sceneList.filter(data => !searchForm.content || data.title.toLowerCase().includes(searchForm.content.toLowerCase()))"
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
        background
        layout="prev, pager, next"
        :total="1000">
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
      sceneList: [],
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
      let args = {
        url: 'manage/sceneData',
        params: to.query
      }
      api.get(args).then(res => {
        vm.sceneList = res['data']
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
    let args = {
      url: 'manage/sceneData',
      params: to.query
    }
    api.get(args).then(res => {})
    next()
  },
  methods: {
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
  }
</style>
