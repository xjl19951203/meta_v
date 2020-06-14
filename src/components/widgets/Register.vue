<template>
  <div class="Login">
    <div class="Wrapper">
      <el-card class="box-card">
        <div class="Title">
          账户注册
        </div>
        <el-divider></el-divider>
        <el-form ref="form" :model="postForm" :rules="rules">
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" placeholder="用户名" v-model="postForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" placeholder="密码" type="password" v-model="postForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="passwordAgain">
            <el-input prefix-icon="el-icon-lock" placeholder="确认密码" type="password" v-model="postForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="handlePost">注册</el-button>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <router-link :to="{name: 'Home', query:{type: 'login'}}" type="warning">前往登录</router-link>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
// import api from 'api'
export default {
  name: 'Login',
  data () {
    return {
      postForm: {
        username: '',
        password: '',
        passwordAgain: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        passwordAgain: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handlePost () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // let args = {
          //   url: 'user',
          //   params: this.postForm
          // }
          // api.post(args).then(res => {
          //   console.log(res)
          // })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
</style>
