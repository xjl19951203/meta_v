<template>
  <div class="Search">
    <div class="wrapper">
      <el-form ref="searchForm" v-model="searchForm">
        <el-form-item prop="content">
          <el-input placeholder="搜索" v-model="searchForm.content" class="input-with-select">
<!--            <el-button slot="append" icon="el-icon-search" @click="handleSubmit"></el-button>-->
            <el-button slot="append" icon="el-icon-search" @click="searchSubmit"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedTables" @change="handleCheckedTablesChange">
            <el-checkbox  label="sceneData">工艺场景</el-checkbox>
            <el-checkbox  label="material">物料</el-checkbox>
            <el-checkbox  label="energy">能源</el-checkbox>
            <el-checkbox  label="device">设备</el-checkbox>
            <el-checkbox  label="envLoad">环境负荷</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
<!--        <el-form-item>-->
<!--          <el-radio-group v-model="searchForm.searchType">-->
<!--            <el-radio label="null">查询所有数据</el-radio>-->
<!--            <el-radio label="baseData">查询基础数据</el-radio>-->
<!--            <el-radio label="sceneData">查询工艺场景数据</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-radio-group v-if="searchForm.searchType==='baseData'" v-model="searchForm.dataType">-->
<!--            <el-radio label="null">所有基础数据</el-radio>-->
<!--            <el-radio label="material">基a础物料数据</el-radio>-->
<!--            <el-radio label="energy">基础能源数据</el-radio>-->
<!--            <el-radio label="device">基础设备数据</el-radio>-->
<!--            <el-radio label="envLoad">基础环境负荷数据</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
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
<!--        <search-item v-for="item in searchList" :key="item.index" :item="item"></search-item>-->
      </div>
    </div>
  </div>
</template>

<script>
import api from 'api'
// import SearchItem from './widgets/SearchItem'
const tableOptions = ['sceneData', 'material', 'energy', 'device', 'envLoad']
export default {
  name: 'Search',
  // components: {
  //   SearchItem
  // },
  data () {
    return {
      tables: tableOptions,
      checkAll: false,
      checkedTables: ['sceneData', 'material', 'energy', 'device', 'envLoad'],
      isIndeterminate: true,
      searchForm: {
        searchType: null,
        dataType: null,
        content: null,
        checkTables: []
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
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     api.get({url: 'search', params: {content: to.query['content'] ? to.query['content'] : ''}}).then(res => {
  //       vm.searchList = res
  //       vm.searchForm.content = to.query['content']
  //       vm.searchForm.searchType = to.query['searchType']
  //       vm.searchForm.dataType = to.query['dataType']
  //     })
  //   })
  // },
  // beforeRouteUpdate (to, from, next) {
  //   api.get({url: 'search', params: {searchType: to.query['searchType'] ? to.query['searchType'] : '', dataType: to.query['dataType'] ? to.query['dataType'] : '', content: to.query['content'] ? to.query['content'] : ''}}).then(res => {
  //     this.searchList = res
  //     this.searchForm.content = to.query['content']
  //     this.searchForm.searchType = to.query['searchType']
  //     this.searchForm.dataType = to.query['dataType']
  //   })
  //   next()
  // }
  methods: {
    handleCheckAllChange (val) {
      this.checkedTables = val ? tableOptions : []
      this.isIndeterminate = false
    },
    handleCheckedTablesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.tables.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.tables.length
    },
    searchSubmit () {
      console.log(this.checkedTables)
      api.get({url: 'search', params: {content: this.searchForm.content, tableType: this.checkedTables.join(',')}}).then(res => {
        this.searchList = res
      })
      // this.$router.push({name: 'SearchItem', query: {searchType: this.searchForm.searchType, dataType: this.searchForm.dataType, content: this.searchForm.content}})
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
