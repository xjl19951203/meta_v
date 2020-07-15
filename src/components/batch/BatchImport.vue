<template>
  <div class="BatchImport">
    <el-card>
      上传文件格式：
      <el-radio-group v-model="fileType">
        <el-radio label="xls">XLS</el-radio>
        <el-radio label="json">JSON</el-radio>
<!--        <el-radio label="csv">CSV</el-radio>-->
<!--        <el-radio label="txt">TXT</el-radio>-->
      </el-radio-group>
    </el-card>
    <el-card>
      导入数据类型：
      <el-radio-group v-if="fileType === 'json'" v-model="tableType">
        <el-radio label="baseTable">基础数据导入</el-radio>
        <el-radio label="sceneData">单个工艺场景导入</el-radio>
        <el-radio label="sceneDataList">多个工艺场景导入</el-radio>
      </el-radio-group>
      <el-radio-group v-else if="fileType === 'excel'" v-model="tableType">
        <el-radio label="baseTable">基础数据导入</el-radio>
        <el-radio label="sceneData">工艺场景导入</el-radio>
        <el-dropdown>
          <el-button type="primary">
            请选择下载模板 <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" v-if="tableType === 'baseTable'">
            <el-dropdown-item @click.native="materialExcel">基础物料表</el-dropdown-item>
            <el-dropdown-item @click.native="energyExcel">基础能源表</el-dropdown-item>
            <el-dropdown-item @click.native="deviceExcel">基础设备表</el-dropdown-item>
            <el-dropdown-item @click.native="envLoadExcel">基础环境负荷表</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu slot="dropdown" v-model="tableName" v-else if="tableType === sceneData">
            <el-dropdown-item @click.native="sceneDataExcel">工艺场景表</el-dropdown-item>
          </el-dropdown-menu >
          <el-button type="primary" @click="downloadTable">下载</el-button>
        </el-dropdown>
      </el-radio-group>
    </el-card>
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <el-divider></el-divider>
<!--    <el-button type="warning">格式校验</el-button>-->
<!--    <el-button type="primary">预览</el-button>-->
    <el-divider></el-divider>
    <el-button type="success" @click="handleBatch">开始批处理</el-button>
  </div>
</template>

<script>
import api from 'api'
import store from '../../store/store'
export default {
  name: 'BatchImport',
  data () {
    return {
      fileType: 'xls',
      tableType: 'baseTable',
      tableName: null,
      testArea: '请选择下载导入模板'
    }
  },
  methods: {
    materialExcel () {
      this.tableName = 'material'
    },
    energyExcel () {
      this.tableName = 'energy'
    },
    deviceExcel () {
      this.tableName = 'device'
    },
    envLoadExcel () {
      this.tableName = 'envLoad'
    },
    sceneDataExcel () {
      this.tableName = 'sceneDataExcel'
    },
    downloadTable () {
      let args
      let tableName = this.tableName
      if (this.tableName === null) {
        this.$message('请选择下载模板！！')
      } else if (this.fileType === 'xls' && this.tableType === 'baseTable') {
        args = {
          url: 'batch/excel/baseTableExcel/' + tableName
        }
      } else if (this.fileType === 'xls' && this.tableType === 'sceneData') {
        args = {
          url: 'batch/excel/sceneDataExcel'
        }
      }
      args.url = store.state.root + args.url
      window.location.href = args.url
      this.$message('下载中，请稍候…')
      // api.get(args).then(res => {
      //   console.log('hfkjab')
      //   window.location.href = args.url
      // })
    },
    handleBatch () {
      let args
      if (this.fileType === 'json' && this.tableType === 'baseTable') {
        args = {
          url: 'batch/json/baseTable/'
        }
      }
      if (this.fileType === 'json' && this.tableType === 'sceneData') {
        args = {
          url: 'batch/json/sceneData'
        }
      }
      if (this.fileType === 'json' && this.tableType === 'sceneDataList') {
        args = {
          url: 'batch/json/sceneDataList'
        }
      }
      if (this.fileType === 'excel' && this.tableType === 'sceneData') {
        args = {
          url: 'batch/excel/sceneData'
        }
      }
      if (this.fileType === 'excel' && this.tableType === 'baseTable') {
        args = {
          url: 'batch/excel/baseTable'
        }
      }
      api.post(args).then(res => {})
    },
    handlePreview (file) {
      console.log(file)
      const reader = new FileReader()
      reader.readAsText(file.raw)
      reader.onload = function () {
        // 当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
        console.log('读取结果转为JSON：')
        let json = JSON.parse(this.result)
        console.log(json)
      }
    }
  }
}
</script>

<style scoped>

</style>
