<template>
  <div class="Search">
    <div class="wrapper">
      <el-form ref="searchForm" v-model="searchForm">
        <el-form-item prop="searchForm.content">
          <el-input class="search-input" placeholder="搜索" @keyup.enter.native="searchSubmit" v-model="searchForm.content">
            <!--            <el-button slot="append" icon="el-icon-search" @click="handleSubmit"></el-button>-->
            <el-button slot="append" icon="el-icon-search" @click="searchSubmit"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="searchForm.checkedTables" @change="handleCheckedTablesChange">
            <el-checkbox label="sceneData">工艺场景</el-checkbox>
            <el-checkbox label="material">物料</el-checkbox>
            <el-checkbox label="energy">能源</el-checkbox>
            <el-checkbox label="device">设备</el-checkbox>
            <el-checkbox label="envLoad">环境负荷</el-checkbox>
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
          <el-button v-if="(searchList.sceneData||'').length!==0" @click="sceneDataDeal" type="success" plain>工艺场景
            <!--            <router-link :to="{name: 'SceneDataList', params: {tableName: 'sceneData', tableList: this.searchList.sceneData}}">工艺场景</router-link>-->
          </el-button>
          <el-divider></el-divider>
          <div>
            <search-item v-if="searchList.sceneData!==undefined" v-for="item in searchList.sceneData" :key="item.index" :item="item"></search-item>
          </div>
          <el-button v-if="(searchList.material||'').length!==0" @click="materialDeal" type="primary" plain>物料
            <!--            <router-link :to="{name: 'Manage', params: {tableName: 'material', tableList: this.searchList.material}}">物料</router-link>-->
          </el-button>
          <el-divider></el-divider>
          <div>
            <search-item v-if="searchList.material!==undefined" v-for="item in searchList.material" :key="item.index" :item="item"></search-item>
          </div>
          <el-button v-if="(searchList.device||'').length!==0" @click="deviceDeal" type="warning" plain>设备
            <!--            <router-link :to="{name: 'Manage', params: {tableName: 'device', tableList: this.searchList.device}}">设备</router-link>-->
          </el-button>
          <el-divider></el-divider>
          <div>
            <search-item v-if="searchList.device!==undefined" v-for="item in searchList.device" :key="item.index" :item="item"></search-item>
          </div>
          <el-button v-if="(searchList.energy||'').length!==0" @click="energyDeal" type="info" plain>能源
            <!--            <router-link :to="{name: 'Manage', params: {tableName: 'energy', tableList: this.searchList.energy}}">能源</router-link>-->
          </el-button>
          <el-divider></el-divider>
          <div>
            <search-item v-if="searchList.energy!==undefined" v-for="item in searchList.energy" :key="item.index" :item="item"></search-item>
          </div>
          <el-button v-if="(searchList.envLoad||'').length!==0" @click="envLoadDeal" type="danger" plain>环境负荷
            <!--            <router-link :to="{name: 'Manage', params: {tableName: 'envLoad', tableList: this.searchList.envLoad}}">环境负荷</router-link>-->
          </el-button>
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
  computed: {
    searchFormList () {
      return this.$store.state.searchList
    }
  },
  data () {
    return {
      tables: tableOptions,
      checkAll: false,
      // checkedTables: ['sceneData', 'material', 'energy', 'device', 'envLoad'],
      isIndeterminate: true,
      searchForm: {
        content: null,
        checkedTables: ['sceneData', 'material', 'energy', 'device', 'envLoad'],
        searchType: null,
        dataType: null
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
      let searchList = localStorage.getItem('searchList')
      if (searchList !== undefined) {
        vm.searchList = JSON.parse(searchList)
        localStorage.removeItem('searchList')
      }
      // let searchForm = localStorage.getItem('searchForm')
      // if (searchForm !== undefined) {
      //   vm.searchForm = JSON.parse(searchForm)
      //   console.log(searchForm.content)
      //   if (vm.searchForm) {
      //     if (vm.searchForm.content || '') {
      //       console.log('beforeRouteEnter')
      //       api.get({url: 'search', params: {content: vm.searchForm.content, tableType: vm.searchForm.checkedTables.join(',')}}).then(res => {
      //         vm.searchList = res
      //       })
      //     }
      //   }
      // }
    })
  },
  beforeRouteUpdate (to, from, next) {
    api.get({url: 'search', params: {content: this.searchForm.content, tableType: this.searchForm.checkedTables.join(',')}}).then(res => {
      this.searchList = res
    })
    next()
  },
  beforeRouteLeave (to, from, next) {
    // console.log('beforeRouteLeave')
    if (localStorage.getItem('searchList') !== undefined) {
      localStorage.removeItem('searchList')
    }
    let searchList = JSON.stringify(this.searchList)
    localStorage.setItem('searchList', searchList)
    // console.log(localStorage.getItem('searchList'))
    // if (localStorage.getItem('searchForm') === undefined) {
    //   console.log('beforeRouteLeave/searchForm')
    //   let searchForm = JSON.stringify(this.searchForm)
    //   localStorage.setItem('searchForm', searchForm)
    // } else {
    //   localStorage.removeItem('searchForm')
    //   let searchForm = JSON.stringify(this.searchForm)
    //   localStorage.setItem('searchForm', searchForm)
    // }
    next()
  },
  // created () {
  //   let searchList = localStorage.getItem('searchList')
  //   if (searchList !== undefined) {
  //     this.searchList = searchList
  //     console.log(this.searchList)
  //     localStorage.removeItem('searchList')
  //   }
  // 从localStorage中读取条件并赋值给查询表单
  // let searchForm = localStorage.getItem('searchForm')
  // if (searchForm !== null) {
  //   this.searchForm = JSON.parse(searchForm)
  // }
  // api.get({url: 'search', params: {content: this.searchForm !== null ? (this.searchForm.content !== null ? this.searchForm.content : '') : '', tableType: this.searchForm !== null ? (this.searchForm.checkedTables !== null ? this.searchForm.checkedTables.join(',') : '') : ''}})
  //   .then((response) => {
  //     console.log(response.data)
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // },
  methods: {
    handleCheckAllChange (val) {
      this.searchForm.checkedTables = val ? tableOptions : []
      this.isIndeterminate = false
    },
    handleCheckedTablesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.tables.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.tables.length
    },
    searchSubmit () {
      this.searchListLength = 0
      api.get({url: 'search', params: {content: this.searchForm.content, tableType: this.searchForm.checkedTables.join(',')}}).then(res => {
        this.searchList = res
        for (var key in this.searchList) {
          this.searchListLength = this.searchListLength + this.searchList[key].length
        }
        console.log(this.searchList)
      })
      // this.$router.push({name: 'SearchItem', query: {searchType: this.searchForm.searchType, dataType: this.searchForm.dataType, content: this.searchForm.content}})
    },
    sceneDataDeal () {
      this.$router.push({name: 'SceneDataList', params: {sceneDataList: this.searchList.sceneData}})
    },
    materialDeal () {
      this.$router.push({name: 'Manage', params: {tableName: 'material', tableList: this.searchList.material}})
    },
    deviceDeal () {
      this.$router.push({name: 'Manage', params: {tableName: 'device', tableList: this.searchList.device}})
    },
    energyDeal () {
      this.$router.push({name: 'Manage', params: {tableName: 'energy', tableList: this.searchList.energy}})
    },
    envLoadDeal () {
      this.$router.push({name: 'Manage', params: {tableName: 'envLoad', tableList: this.searchList.envLoad}})
    }
  }
}
</script>

<style lang="scss">
  .Search{
    .el-form{
      padding: 20px 0;
    }
    .search-input{
      width: 900px;
      border-style: ridge;
      border-color: cornflowerblue;
      border-width: 5px
    }
  }
</style>
