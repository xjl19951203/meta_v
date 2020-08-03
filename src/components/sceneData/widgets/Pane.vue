<template>
  <div class="Pane">
    <p>
      <el-button type="primary" size="mini" @click="handleEditDrawer(null)">
        <i class="el-icon-circle-plus-outline"></i> 新增数据
      </el-button>
    </p>
    <el-table
      :data="list">
      <el-table-column
        :fixed="true"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleEditDrawer(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDeleteDialog(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        :label="column['columnComment']"
        v-for="column in tableColumns"
        v-if="!column['columnComment'].match('工艺场景') && !column['columnComment'].match('输入帧')
        && !column['columnComment'].match('输出帧') && !column['columnComment'].match('编号')"
        :key="column.index"
        width="150">
        <template slot-scope="scope">
          {{((column['columnKey'] === 'MUL') && (scope.row[column['columnName']] !== null)) ?
          ((scope.row[column['columnName'].substring(0, column['columnName'].length - 2)] === null) ||
            (scope.row[column['columnName'].substring(0, column['columnName'].length - 2)] === undefined) ?
           'null' : scope.row[column['columnName'].substring(0, column['columnName'].length - 2)]['title'])
           : scope.row[column['columnName']]}}
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      class="PaneEditDrawer"
      :title="editType + label"
      :visible.sync="editDrawer"
      :direction="'rtl'"
      :size="'50%'">
      <el-form ref="editForm" :model="editForm" label-width="150px">
        <el-form-item :prop="column['columnName']" :label="column['columnComment']"
          v-show="column['columnName'] !== 'id' && !column['columnComment'].match('输入帧')
          && !column['columnComment'].match('输出帧') && !column['columnComment'].match('时间')"
          v-for="column in tableColumns" :key="column.index" v-if="column['columnName'] !== 'sceneDataId'">
          <el-input v-if="column['columnKey'] !== 'MUL'" v-model="editForm[column['columnName']]"
           :type="column['dataType'] === 'int' ? 'number' : 'textarea'">
          </el-input>
          <el-select v-if="column['columnKey'] === 'MUL'"  v-model="editForm[column['columnName']]" filterable placeholder="请选择">
            <el-option
            v-for="item in baseTableMap[column['columnName'].substring(0, column['columnName'].length - 2)]"
            :key="item.id"
            :label="item['title']"
            :value="item.id">
            </el-option>
          </el-select>
          <span v-if="column['columnKey'] === 'MUL'" class="AddManageDataTips">
            <el-button type="text" @click="handleManageDrawer(column['columnName'], column['columnComment'])">
              缺少数据？前往添加
            </el-button>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleSubmit">
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-drawer
      class="AddManageDataDrawer"
      :title="'新增'+addManageData.label"
      :visible.sync="addManageData.visible"
      :direction="'ltr'"
      :size="'50%'">
      <AddManageData :tableName="addManageData.tableName"></AddManageData>
    </el-drawer>
  </div>
</template>
<script>
import api from 'api'
import AddManageData from './AddManageData'
export default {
  name: 'Pane',
  components: {
    AddManageData
  },
  props: {
    inputFrameDataId: {
      type: Number
    },
    outputFrameDataId: {
      type: Number
    },
    list: {
      type: Array
    },
    tableName: {
      type: String,
      default: 'materialData'
    },
    label: {
      type: String
    }
  },
  watch: {
    tableName: {
      immediate: true, // 很重要！！！，必须叫handler
      handler (val) {
        this.tableColumns = this.$store.state.systemTable[this.tableName]['systemColumnList']
      }
    }
  },
  computed: {
    baseTableMap () {
      return this.$store.state.baseTableMap
    }
  },
  data () {
    return {
      editType: '新增',
      addManageData: {
        tableName: '',
        visible: false,
        label: ''
      },
      addManageDataVisible: false,
      deleteDialogVisible: false,
      editDrawer: false,
      editForm: {},
      tableColumns: []
    }
  },
  methods: {
    handleManageDrawer (columnName, columnComment) {
      this.addManageData.tableName = columnName.substring(0, columnName.length - 2)
      this.addManageData.visible = true
      this.addManageData.label = columnComment
    },
    handleColumns () {
      this.$store.state.systemTable.forEach(table => {
        if (table['tableName'] === this.tableName) {
          this.tableColumns = table['systemColumnList']
        }
      })
    },
    handleSubmit () {
      // 修复bug
      this.editType = '新增'
      if (this.tableName.match('envLoadData') || this.tableName.match('outputPartData')) {
        console.log(this.outputFrameDataId)
        this.editForm['outputFrameDataId'] = this.outputFrameDataId
      } else {
        console.log(this.inputFrameDataId)
        this.editForm['inputFrameDataId'] = this.inputFrameDataId
      }
      if (this.editForm['id'] === undefined) {
        api.post({url: 'manage/' + this.tableName, params: this.editForm}).then(res => {
          history.go(0)
        })
      } else {
        api.put({url: 'manage/' + this.tableName, params: this.editForm}).then(res => {
          history.go(0)
        })
      }
    },
    handleEditDrawer (row) {
      if (row !== null) {
        this.editType = '编辑'
      }
      this.editForm = {}
      if (row) {
        this.editForm = row
        // 修复bug，
        this.editForm['inputFrameDataId'] = this.inputFrameDataId
      }
      this.editDrawer = true
    },
    handleDeleteDialog (row) {
      this.editForm = row
      this.deleteDialogVisible = true
    }
  }
}
</script>
<style lang=scss>
  .PaneEditDrawer, .AddManageDataDrawer{
    .el-drawer__body{
      height: 100px !important;
      form{
        padding: 0 20px!important;
        height: 100% !important;
        overflow-y: auto!important;
      }
    }
  }
  .AddManageDataTips{
    button{
      color: #aaa;
      &:hover{
        text-decoration: underline;
      }
    }
  }
</style>
