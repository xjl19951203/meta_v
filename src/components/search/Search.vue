<template>
  <div class="Search">
    <div class="wrapper">
      <el-form ref="searchForm" v-model="searchForm">
        <el-form-item prop="content">
          <el-input placeholder="搜索" @keyup.enter.native="searchSubmit" v-model="searchForm.content" class="input-with-select">
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
      </el-form>
      <el-divider></el-divider>
      <div v-if="searchListLength === 0">
        <p>暂无数据</p>
        <p>请输入搜索内容...</p>
      </div>
      <div v-else>
        <div>
          查询统计：共查询到{{searchListLength}} 条记录，其中：
        </div>
        <el-divider></el-divider>
        <el-tag v-if="searchList.sceneData !== undefined">
          工艺场景:查询到{{(searchList.sceneData||'').length}} 条记录
        </el-tag>
        <el-tag v-if="searchList.material !== undefined">
          物料:查询到{{(searchList.material||'').length}} 条记录
        </el-tag>
        <el-tag v-if="searchList.energy !== undefined">
          能源:查询到{{(searchList.energy||'').length}} 条记录
        </el-tag>
        <el-tag v-if="searchList.device !== undefined">
          设备:查询到{{(searchList.device||'').length}} 条记录
        </el-tag>
        <el-tag v-if="searchList.envLoad !== undefined">
          环境负荷:查询到{{(searchList.envLoad||'').length}} 条记录
        </el-tag>
        <el-divider></el-divider>
        <div>
          <el-tag type="success" @click="sceneDataDeal">工艺场景</el-tag>
          <el-divider></el-divider>
          <div>
            <search-item v-if="searchList.sceneData!==undefined" v-for="item in searchList.sceneData" :key="item.index" :item="item"></search-item>
          </div>
          <el-divider></el-divider>
          <el-tag type="primary" @click="materialDeal">物料</el-tag>
          <el-divider></el-divider>
          <div>
            <search-item v-if="searchList.material!==undefined" v-for="item in searchList.material" :key="item.index" :item="item"></search-item>
          </div>
          <el-divider></el-divider>
          <el-tag type="warning" @click="energyDeal">设备</el-tag>
          <el-divider></el-divider>
          <div>
            <search-item v-if="searchList.device!==undefined" v-for="item in searchList.device" :key="item.index" :item="item"></search-item>
          </div>
          <el-divider></el-divider>
          <el-tag type="info" @click="energyDeal">能源</el-tag>
          <el-divider></el-divider>
          <div>
            <search-item v-if="searchList.energy!==undefined" v-for="item in searchList.energy" :key="item.index" :item="item"></search-item>
          </div>
          <el-divider></el-divider>
          <el-tag type="danger" @click="envLoadDeal">环境负荷</el-tag>
          <el-divider></el-divider>
          <div>
            <search-item v-if="searchList.envLoad!==undefined" v-for="item in searchList.envLoad" :key="item.index" :item="item"></search-item>
          </div>
        </div>
<!--        <div>-->
<!--            <search-item v-if="searchList.sceneData!==undefined" v-for="item in searchList.sceneData" :key="item.index" :item="item"></search-item>-->
<!--            <search-item v-if="searchList.material!==undefined" v-for="item in searchList.material" :key="item.index" :item="item"></search-item>-->
<!--            <search-item v-if="searchList.energy!==undefined" v-for="item in searchList.energy" :key="item.index" :item="item"></search-item>-->
<!--            <search-item v-if="searchList.device!==undefined" v-for="item in searchList.device" :key="item.index" :item="item"></search-item>-->
<!--            <search-item v-if="searchList.envLoad!==undefined" v-for="item in searchList.envLoad" :key="item.index" :item="item"></search-item>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import api from 'api'
import SearchItem from './widgets/SearchItem.vue'
const tableOptions = ['sceneData', 'material', 'energy', 'device', 'envLoad']
export default {
  name: 'Search',
  components: {
    SearchItem
  },
  data () {
    return {
      tables: tableOptions,
      checkAll: false,
      checkedTables: ['sceneData', 'material', 'energy', 'device', 'envLoad'],
      isIndeterminate: true,
      searchForm: {
        searchType: null,
        dataType: null,
        content: null
      },
      searchList: {
        sceneData: [],
        material: [],
        energy: [],
        device: [],
        envLoad: []
      },
      searchListLength: 0
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      api.get({url: 'search', params: {content: to.query['content'] ? to.query['content'] : ''}, tableType: to.query[vm.checkedTables.join(',')] ? to.query[vm.checkedTables.join(',')] : ''}).then(res => {
        vm.searchList = res
        vm.searchForm.content = to.query['content']
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
    api.get({url: 'search', params: {content: to.query.searchForm.content, tableType: to.query.checkedTables.join(',')}}).then(res => {
      this.searchList = res
      this.searchForm.content = to.query['content']
    })
    next()
  },
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
      this.searchListLength = 0
      console.log(this.checkedTables)
      api.get({url: 'search', params: {content: this.searchForm.content, tableType: this.checkedTables.join(',')}}).then(res => {
        this.searchList = res
        for (var key in this.searchList) {
          this.searchListLength = this.searchListLength + this.searchList[key].length
        }
        console.log(this.searchList)
      })
      // this.$router.push({name: 'SearchItem', query: {searchType: this.searchForm.searchType, dataType: this.searchForm.dataType, content: this.searchForm.content}})
    },
    materialDeal () {
      this.$store.state.baseTableMap = this.searchList.material
      this.$router.push({name: 'Manage'})
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
