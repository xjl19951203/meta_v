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
      <el-radio-group v-else-if="fileType === 'xls'" v-model="tableType" @change="changeDefault">
        <el-radio label="baseTable">基础数据导入</el-radio>
        <el-radio label="sceneData">工艺场景导入</el-radio>
        <el-dropdown @command="nameExcel">
          <el-button type="primary">
            {{variable}} <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" split-button="true" v-if="tableType === 'baseTable'" >
            <el-dropdown-item command="a">基础物料表</el-dropdown-item>
            <el-dropdown-item command="b">基础能源表</el-dropdown-item>
            <el-dropdown-item command="c">基础设备表</el-dropdown-item>
            <el-dropdown-item command="d">基础环境负荷表</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu slot="dropdown" v-else-if="tableType === 'sceneData'">
            <el-dropdown-item command="e">工艺场景表</el-dropdown-item>
          </el-dropdown-menu >
          <el-button type="primary" @click="downloadTable">下载</el-button>
        </el-dropdown>
      </el-radio-group>
    </el-card>
<!--    on-exceed文件个数超出限制-->
<!--    on-change文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用-->
<!--    on-preview点击已经上传的文件-->
<!--    http-request覆盖默认的上传行为，可以自定义上传的实现-->
<!--    before-remove移除已经上传的文件-->
    <el-upload
      class="upload-demo"
      :action="myUrl()"
      name="file"
      :auto-upload='false'
      :drag="true"
      :multiple='false'
      :limit="1"
      :on-exceed="handleExceed"
      :on-change="change"
      :on-preview="handlePreview"
      :before-remove="beforeRemove"
      :on-error="uploadFalse"
      :on-success="uploadSuccess"
      ref="uploadFileRef"
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">一次只能上传一个文件，单文件不超过1MB</div>
    </el-upload>
    <el-divider></el-divider>
<!--    <el-button type="warning">格式校验</el-button>-->
<!--    <el-button type="primary">预览</el-button>-->
<!--    <el-divider></el-divider>-->
    <el-button type="success" @click="submit">开始批处理</el-button>
  </div>
</template>

<script>
// import api from 'api'
import store from '../../store/store'
export default {
  name: 'BatchImport',
  data () {
    return {
      fileType: 'xls',
      tableType: 'baseTable',
      variable: '请选择下载模板',
      tableName: null,
      cTableName: null,
      postForm: null,
      fileUrl: null,
      baseUrl: '',
      fileState: true
    }
  },
  computed: {
    getUrl () {
      let baseUrl
      if (this.fileType === 'xls') {
        baseUrl = store.state.root + 'batch/excel/'
      } else if (this.fileType === 'json') {
        baseUrl = store.state.root + 'batch/json/'
      }
      if (this.tableType === 'baseTable') {
        return baseUrl + 'baseTable'
      } else if (this.tableType === 'sceneData') {
        return baseUrl + 'sceneData'
      } else if (this.tableType === 'sceneDataList') {
        return baseUrl + 'sceneDataList'
      } else if (this.tableType === 'inputFrameDataList') {
        return baseUrl + 'inputFrameDataList'
      } else if (this.tableType === 'outputFrameDataList') {
        return baseUrl + 'outputFrameDataList'
      }
    }
  },
  methods: {
    myUrl () {
      if (this.tableType === 'baseTable') {
        return 'http://localhost:8000/api/batch/excel/baseTable'
        // return store.state.root + 'batch/excel/baseTable'
      } else if (this.tableType === 'sceneData') {
        return 'http://localhost:8000/api/batch/excel/sceneData'
        // return store.state.root + 'batch/excel/sceneData'
      }
    },
    changeDefault () {
      if (this.tableType === 'baseTable') {
        this.variable = '请选择下载模板'
        this.baseUrl = store.state.root + 'batch/excel/baseTable'
      } else if (this.tableType === 'sceneData') {
        this.variable = '请下载模板'
        this.baseUrl = store.state.root + 'batch/excel/baseTable'
      }
    },
    nameExcel (command) {
      if (command === 'a') {
        this.tableName = 'material'
        this.variable = '基础物料表'
      } else if (command === 'b') {
        this.tableName = 'energy'
        this.variable = '基础能源表'
      } else if (command === 'c') {
        this.tableName = 'device'
        this.variable = '基础设备表'
      } else if (command === 'd') {
        this.tableName = 'envLoad'
        this.variable = '基础环境负荷表'
      } else if (command === 'e') {
        this.tableName = 'sceneDataExcel'
        this.variable = '工艺场景表'
      }
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
    // 文件超出个数限制时的钩子,上传文件个数超过定义的数量
    handleExceed (files, fileList) {
      this.$message.warning(`单次限制上传1个文件`)
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用,(file[0].name || '')
    change (event, file, fileList) {
      // console.log('change', file, file[0].name)
      if (this.fileType === 'xls') {
        const extension = file[0].name.split('.')[1] === 'xls'
        const extension2 = file[0].name.split('.')[1] === 'xlsx'
        const extension3 = file[0].name.includes('工艺场景') && this.tableType === 'baseTable'
        const extension4 = file[0].name.includes('基础') && this.tableType === 'sceneData'
        const isLt1M = file[0].size / 1024 / 1024 <= 1
        if (!extension && !extension2) {
          this.$message({
            message: '当前条件只能上传xls、xlsx格式的文件，请重新上传文件或选择xls、xlsx文件上传!',
            type: 'error'
          })
          this.$refs.uploadFileRef.clearFiles()
          // alert('上传文件只能是 xls、xlsx格式!')
        } else if (!isLt1M) {
          this.$message({
            message: '上传文件大小不能超过1MB',
            type: 'error'
          })
          console.log('beforeUpload')
          this.$refs.uploadFileRef.clearFiles()
        } else if (extension3 || extension4) {
          this.$message({
            message: '请选择正确的导入数据类型',
            type: 'warning'
          })
        }
      }
      if (this.fileType === 'json') {
        const extension = file[0].name.split('.')[1] === 'json'
        const extension2 = file[0].name.includes('工艺场景') && !file[0].name.includes('批量') && this.tableType === 'sceneData'
        const extension3 = file[0].name.includes('基础') && this.tableType === 'baseTable'
        const extension4 = file[0].name.includes('批量工艺场景') && this.tableType === 'sceneDataList'
        const extension5 = file[0].name.includes('输入数据帧') && this.tableType === 'inputFrameDataList'
        const extension6 = file[0].name.includes('输出数据帧') && this.tableType === 'outputFrameDataList'
        const isLt1M = file[0].size / 1024 / 1024 <= 1
        if (!extension) {
          this.$message({
            message: '当前条件只能上传json格式的文件，请重新上传文件或选择json格式文件上传!',
            type: 'error'
          })
          this.$refs.uploadFileRef.clearFiles()
          // alert('上传文件只能是 xls、xlsx格式!')
        } else if (!isLt1M) {
          this.$message({
            message: '上传文件大小不能超过1MB',
            type: 'error'
          })
          console.log('beforeUpload')
          this.$refs.uploadFileRef.clearFiles()
        } else if (!(extension2 || extension3 || extension4 || extension5 || extension6)) {
          this.$message({
            message: '请选择正确的导入数据类型',
            type: 'warning'
          })
        }
      }
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview (file) {
      if (this.fileType === 'json') {
        console.log(file)
        const reader = new FileReader()
        reader.readAsText(file[0].raw)
        reader.onload = function () {
          let that = this
          // 当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
          console.log('读取结果转为JSON：')
          let json = JSON.parse(this.result)
          console.log(json)
          that.postForm = json
        }
      }
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    submit () {
      this.$refs.uploadFileRef.submit()
    },
    uploadSuccess (response, file, fileList) {
      // console.log('文件导入成功', file, response)
      alert('文件导入成功')
      this.$refs.uploadFileRef.clearFiles()
    },
    uploadFalse (response, file, fileList) {
      alert('文件导入失败！')
      this.$refs.uploadFileRef.clearFiles()
    }
    // submitUpload () {
    //   let baseUrl
    //   if (this.fileType === 'xls') {
    //     baseUrl = 'batch/excel/'
    //   } else if (this.fileType === 'json') {
    //     baseUrl = 'batch/json/'
    //   }
    //   if (this.tableType === 'baseTable') {
    //     this.fileUrl = baseUrl + 'baseTable'
    //   } else if (this.tableType === 'sceneData') {
    //     this.fileUrl = baseUrl + 'sceneData'
    //   } else if (this.tableType === 'sceneDataList') {
    //     this.fileUrl = baseUrl + 'sceneDataList'
    //   } else if (this.tableType === 'inputFrameDataList') {
    //     this.fileUrl = baseUrl + 'inputFrameDataList'
    //   } else if (this.tableType === 'outputFrameDataList') {
    //     this.fileUrl = baseUrl + 'outputFrameDataList'
    //   }
    //   let formData = new FormData()
    //   formData.append('file', this.formData.file)
    //   let args
    //   args = {
    //     url: this.fileUrl,
    //     config: {
    //       headers: {'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'}
    //     }
    //   }
    //   api.post(args, formData).then(res => {})
    // }
  }
}
</script>

<style scoped>

</style>
