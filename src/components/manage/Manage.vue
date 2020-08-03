<template>
  <div class="Manage">
    <el-divider></el-divider>
    <div style="margin:0 6px;">
      <el-row :gutter="12" class="hover">
        <el-col :span="15">
          <el-input class="base-input" placeholder="检索数据" v-model="searchContent">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8" style="text-align:right">
          <el-button type="primary" @click="handleEditDrawer(null)" :disabled="searchVisible">
            <i class="fa fa-plus-circle fa-fw"></i> 添加新条目
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <el-table
      style="width: 100%"
      :data="tableList.filter(data => !searchContent || data.title.toLowerCase().includes(searchContent.toLowerCase()))">
      <!--      创建表格的所有列并填入数据-->
      <el-table-column
        v-for="column in tableColumns"
        :label="column['columnComment']"
        :key="column.index">
        <!--这段解释-->
        <!--        这里用slot-scope="scope"取到表格中的当前单元格-->
        <!--        scope.row 直接取到该单元格对象，就是数组里的元素对象-->
        <template slot-scope="scope">
          <div v-if="column['columnKey'] === 'MUL'">
            {{scope.row[column['columnName'].substring(0, column['columnName'].length - 2)] ?
            scope.row[column['columnName'].substring(0, column['columnName'].length - 2)]['title'] : scope.row[column['columnName']]}}
          </div>
          <div v-else>
            {{ scope.row[column['columnName']] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEditDrawer(scope.row)" :disabled="searchVisible" type="text" size="small">编辑</el-button>
          <el-button @click="handleDeleteDialog(scope.row)" :disabled="searchVisible" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      class="manageEditDrawer"
      title="编辑条目"
      :visible.sync="editDrawer"
      :direction="'rtl'"
      :size="'50%'">
      <el-form ref="postForm" v-model="editForm" label-width="150px">
        <el-form-item :prop="item['columnName']" :label="item['columnComment']" v-show="item['columnName'] !== 'id'"
         v-for="item in tableColumns" :key="item.index">
          <el-input v-if="item['columnKey'] !== 'MUL'" v-model="editForm[item['columnName']]"
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
    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      width="400px">
      <span>确定删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from 'api'
export default {
  name: 'Manage',
  computed: {
    baseTableMap () {
      return this.$store.state.baseTableMap
    }
  },
  data () {
    return {
      searchVisible: false,
      tableName: 'tableName',
      editDrawer: false,
      showDrawer: false,
      deleteDialogVisible: false,
      tableList: [],
      editForm: {},
      showForm: {},
      tableColumns: [],
      searchContent: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.tableName = to.params['tableName']
      if (to.params['tableList'] !== undefined) {
        vm.tableList = to.params['tableList']
        vm.searchVisible = true
      } else {
        vm.tableList = vm.$store.state.baseTableMap[vm.tableName]
      }
      // 取消网络请求，直接从store中读取基础数据，注意键需要加上‘Id’
      vm.handleColumns()
      vm.initEditForm()
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.tableName = to.params['tableName']
    this.tableList = this.$store.state.baseTableMap[this.tableName]
    this.searchVisible = false
    this.handleColumns()
    this.initEditForm()
    next()
  },
  methods: {
    initEditForm () {
      this.editForm = {}
      this.tableColumns.forEach(item => {
        this.editForm[item['columnName']] = ''
      })
    },
    handleColumns () {
      this.tableColumns = this.$store.state.systemTable[this.tableName]['systemColumnList']
    },
    handleSubmit () {
      if (this.editForm['id'] === undefined) {
        api.post({url: 'manage/' + this.tableName, params: this.editForm}).then(res => {
          // history.go(0)
        })
      } else {
        api.put({url: 'manage/' + this.tableName, params: this.editForm}).then(res => {
          // history.go(0)
        })
      }
    },
    handleEditDrawer (row) {
      this.editForm = {}
      if (row) {
        this.editForm = row
      }
      this.editDrawer = true
    },
    // detailShowDrawer (row) {
    //   this.showForm = {}
    //   if (row) {
    //     this.showForm = row
    //   }
    //   this.showDrawer = true
    // },
    handleDeleteDialog (row) {
      this.editForm = row
      this.deleteDialogVisible = true
    },
    handleDelete () {
      this.deleteDialogVisible = false
      alert('暂不允许删除数据！！')
      // api.delete({url: 'manage/' + this.tableName + '/' + this.editForm['id']}).then(res => {
      //   history.go(0)
      // })
    }
  }
}
</script>

<style lang="scss">
  .manageEditDrawer{
    .el-drawer__body{
      height: 100px !important;
      form{
        padding: 0 20px!important;
        height: 100% !important;
        overflow-y: auto!important;
      }
    }
  }
  .Manage{
    .base-input{
      width: 700px;
      border-style: ridge;
      border-color: cornflowerblue;
      border-width: 5px
    }
  }
</style>
