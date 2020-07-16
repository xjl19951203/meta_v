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
        <el-radio label="baseTable">基础数据</el-radio>
        <el-radio label="sceneData">工艺场景</el-radio>
        <el-radio label="sceneDataList">批量工艺场景导入</el-radio>
        <el-radio label="inputFrameDataList">批量输入数据帧</el-radio>
        <el-radio label="outputFrameDataList">批量输出数据帧</el-radio>
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
      action="https://localhost/posts/"
      :drag="true"
      :multiple='false'
      :limit="1"
      :auto-upload='false'
      :on-exceed="handleExceed"
      :on-preview="handlePreview"
      :before-upload="checkFileType"
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">一次只能上传一个文件，单文件不超过1MB</div>
    </el-upload>
    <el-divider></el-divider>
<!--    <el-button type="warning">格式校验</el-button>-->
<!--    <el-button type="primary">预览</el-button>-->
<!--    <el-divider></el-divider>-->
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
      testArea: '请选择下载导入模板',
      postForm: null,
      file: null
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
    },
    // 上传文件个数超过定义的数量
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
    },
    handlePreview (file) {
      if (this.fileType === 'json') {
        console.log(file)
        const reader = new FileReader()
        reader.readAsText(file.raw)
        reader.onload = function () {
          let that = this
          // 当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
          console.log('读取结果转为JSON：')
          let json = JSON.parse(this.result)
          console.log(json)
          that.postForm = json
        }
      } else if (this.fileType === 'xls') {
        this.file = file.formData()
      }
    },
    handleBatch () {
      let args
      if (this.fileType === 'json' && this.tableType === 'baseTable') {
        args = {
          url: 'batch/json/baseTable/',
          params: this.postForm
        }
      }
      if (this.fileType === 'json' && this.tableType === 'sceneData') {
        args = {
          url: 'batch/json/sceneData',
          params: this.postForm
        }
      }
      if (this.fileType === 'json' && this.tableType === 'sceneDataList') {
        args = {
          url: 'batch/json/sceneDataList',
          params: this.postForm
        }
      }
      if (this.fileType === 'xls' && this.tableType === 'sceneData') {
        args = {
          url: 'batch/excel/sceneData',
          params: this.postForm
        }
      }
      if (this.fileType === 'xls' && this.tableType === 'baseTable') {
        args = {
          url: 'batch/excel/baseTable',
          params: this.file,
          config: {
            // eslint-disable-next-line standard/object-curly-even-spacing
            headers: { 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'}
          }
        }
      }
      api.post(args).then(res => {
        // switch (this.fileInfo) {
        //   case 'sceneData':
        //     this.$router.push({name: 'SceneData', params: {sceneDataId: res}})
        //     break
        //   case 'sceneDataList':
        //     this.postForm = res
        //     // this.resFlag = true
        //     break
        // }
      })
    },
    checkFileType () {
      // this.file
      // if ()
      console.log('fajh')
    }
  }
}
</script>

<style scoped>

</style>
