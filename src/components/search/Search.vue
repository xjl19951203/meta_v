<template>
  <div class="Search">
    <div class="wrapper">
      <el-form ref="searchForm" v-model="searchForm">
        <el-form-item prop="content">
          <el-input placeholder="搜索" v-model="searchForm.content" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="handleSubmit"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="searchForm.searchType">
            <el-radio label="baseData">查询基础数据</el-radio>
            <el-radio label="sceneData">查询工艺场景数据</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-if="searchForm.searchType==='baseData'" v-model="searchForm.dataType">
            <el-radio label="material">基础物料数据</el-radio>
            <el-radio label="energy">基础能源数据</el-radio>
            <el-radio label="device">基础设备数据</el-radio>
            <el-radio label="envLoad">基础环境负荷数据</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <el-divider></el-divider>
      <div v-if="searchList.length === 0">
        <el-card class="box-card">
          <p>暂无数据</p>
          <el-divider></el-divider>
          <p>请输入搜索内容...</p>
        </el-card>
      </div>
      <div v-else>
        <p>
          <i class="fa fa-fw fa-bar-chart"></i>
          查询统计：{{searchList.length}} 条记录
        </p>
        <el-divider></el-divider>
        <search-item v-for="item in searchList" :key="item.index" :item="item"></search-item>
      </div>
    </div>
  </div>
</template>

<script>
import api from 'api'
import SearchItem from './widgets/SearchItem'
export default {
  name: 'Search',
  components: {
    SearchItem
  },
  data () {
    return {
      searchForm: {
        searchType: '',
        dataType: '',
        content: ''
      },
      searchList: {
        sceneData: [],
        material: [],
        energy: [],
        device: [],
        envLoad: []
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      api.get({url: 'search', params: {content: to.query['content'] ? to.query['content'] : ''}}).then(res => {
        vm.searchList = res
        vm.searchForm.content = to.query['content']
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
    api.get({url: 'search', params: {content: to.query['content'] ? to.query['content'] : ''}}).then(res => {
      this.searchList = res
      this.searchForm.content = to.query['content']
    })
    next()
  },
  methods: {
    handleSubmit () {
      this.$router.push({name: 'SearchItem', query: {content: this.searchForm.content}})
    }
  }
}
</script>

<style lang="scss">
  .Search{
    .el-form{
      padding: 20px 0;
    }
  }
</style>
