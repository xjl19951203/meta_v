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
    <el-button type="warning">格式校验</el-button>
    <el-button type="primary">预览</el-button>
    <el-divider></el-divider>
    <el-button type="success">开始批处理</el-button>
  </div>
</template>

<script>
import api from 'api'
export default {
  name: 'BatchImport',
  data () {
    return {
      fileType: 'xls',
      tableType: 'baseTable'
    }
  },
  methods: {
    handleBatch () {
      let args
      if (this.fileType === 'json' && this.tableType === 'baseTable') {
        args = {
          url: 'batch/excel/json/baseTable/:tableName'
        }
      }
      if (this.this.fileType === 'json' && this.tableType === 'sceneData') {
        args = {
          url: 'batch/excel/json/sceneData'
        }
      }
      if (this.fileType === 'excel') {
        args = {
          url: 'batch/excel/sceneData'
        }
      }
      api.post(args).then(res => {})
    },
    handlePreview (file) {
      console.log(file)
      const reader = new FileReader()
      if (this.fileType === 'xls') {

      }
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
