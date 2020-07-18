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
    <el-upload
      class="upload-demo"
      action="getUrl"
      name="file"
      :auto-upload='false'
      :drag="true"
      :multiple='false'
      :limit="1"
      :on-exceed="handleExceed"
      :on-change="change"
      :on-preview="handlePreview"
      :http-request="uploadFile"
      :before-remove="beforeRemove"
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">一次只能上传一个文件，单文件不超过1MB</div>
    </el-upload>
    <el-divider></el-divider>
<!--    <el-button type="warning">格式校验</el-button>-->
<!--    <el-button type="primary">预览</el-button>-->
<!--    <el-divider></el-divider>-->
    <el-button type="success" @click="submitUpload">开始批处理</el-button>
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
      variable: '请选择下载模板',
      tableName: null,
      cTableName: null,
      postForm: null,
      fileUrl: null,
      fileList: [],
      form: {
        file: ''
      }
    }
  },
  methods: {
    changeDefault () {
      if (this.tableType === 'baseTable') {
        this.variable = '请选择下载模板'
      } else if (this.tableType === 'sceneData') {
        this.variable = '请下载模板'
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
    // 根据文件类型和表类型构造url,设置auto-upload为true时直接将请求发送到这个地址
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
    },
    // 文件超出个数限制时的钩子,上传文件个数超过定义的数量
    handleExceed (files, fileList) {
      this.$message.warning(`单次限制上传1个文件`)
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    change (event, file, fileList) {
      console.log('change', file, file.raw)
      this.form.file = file.raw
      // if (file.name('xls')) {
      //   console.log('hfoiashg')
      // }
      // const extension = file.name.split('.')[1] === 'xls'
      // const extension2 = file.name.split('.')[1] === 'xlsx'
      // const isLt1M = file.size / 1024 / 1024 < 1
      // if (!extension && !extension2) {
      //   this.$message.error('上传文件只能是 xls、xlsx格式!')
      // }
      // if (!isLt1M) {
      //   this.$message.error('上传文件大小不能超过1MB!')
      // }
      // return extension || extension2 || isLt1M
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    // auto-upload为false时不触发
    // beforeUpload (file) {
    //   console.log(file.name)
    //   console.log('before')
    //   // this.formData.append('file', file.file)
    //   // const extension = file.name.split('.')[1] === 'xls'
    //   // const extension2 = file.name.split('.')[1] === 'xlsx'
    //   // const isLt1M = file.size / 1024 / 1024 < 1
    //   // if (!extension && !extension2) {
    //   //   this.$message.error('上传文件只能是 xls、xlsx格式!')
    //   // }
    //   // if (!isLt1M) {
    //   //   this.$message.error('上传文件大小不能超过1MB!')
    //   // }
    //   // return extension || extension2 || isLt1M
    // },
    // 点击文件列表中已上传的文件时的钩子
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
      }
    },
    uploadFile (file) {
      this.formData.append('file', file.file)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    submitUpload () {
      let baseUrl
      if (this.fileType === 'xls') {
        baseUrl = 'batch/excel/'
      } else if (this.fileType === 'json') {
        baseUrl = 'batch/json/'
      }
      if (this.tableType === 'baseTable') {
        this.fileUrl = baseUrl + 'baseTable'
      } else if (this.tableType === 'sceneData') {
        this.fileUrl = baseUrl + 'sceneData'
      } else if (this.tableType === 'sceneDataList') {
        this.fileUrl = baseUrl + 'sceneDataList'
      } else if (this.tableType === 'inputFrameDataList') {
        this.fileUrl = baseUrl + 'inputFrameDataList'
      } else if (this.tableType === 'outputFrameDataList') {
        this.fileUrl = baseUrl + 'outputFrameDataList'
      }
      let formData = new FormData()
      formData.append('file', this.form.file)
      let args
      args = {
        url: this.fileUrl,
        config: {
          headers: {'Content-Type': 'multipart/form-data'}
          // ; boundary=<calculated when request is sent>
        }
      }
      api.post(args).then(res => {})
      // if (this.fileType === 'json' && this.tableType === 'baseTable') {
      //   args = {
      //     url: 'batch/json/baseTable/',
      //     params: this.postForm
      //   }
      // }
      // if (this.fileType === 'json' && this.tableType === 'sceneData') {
      //   args = {
      //     url: 'batch/json/sceneData',
      //     params: this.postForm
      //   }
      // }
      // if (this.fileType === 'json' && this.tableType === 'sceneDataList') {
      //   args = {
      //     url: 'batch/json/sceneDataList',
      //     params: this.postForm
      //   }
      // }
      // if (this.fileType === 'xls' && this.tableType === 'sceneData') {
      //   args = {
      //     url: 'batch/excel/sceneData',
      //     params: this.postForm
      //   }
      // }
      // if (this.fileType === 'xls' && this.tableType === 'baseTable') {
      //   args = {
      //     url: 'batch/excel/baseTable',
      //     params: this.file,
      //     config: {
      //       // eslint-disable-next-line standard/object-curly-even-spacing
      //       headers: { 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'}
      //     }
      //   }
      // }
      // api.post(args).then(res => {
      //   switch (this.fileInfo) {
      //     case 'sceneData':
      //       this.$router.push({name: 'SceneData', params: {sceneDataId: res}})
      //       break
      //     case 'sceneDataList':
      //       this.postForm = res
      //       // this.resFlag = true
      //       break
      //   }
      // })
    }
  }
}
</script>

<style scoped>

</style>
