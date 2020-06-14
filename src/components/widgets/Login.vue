<template>
  <div class="Login">
    <div class="Wrapper">
      <el-card class="box-card">
        <div class="Title">
          账户登录
        </div>
        <el-divider></el-divider>
        <el-form ref="form" :model="postForm" :rules="rules">
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" placeholder="用户名" v-model="postForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" type="password" placeholder="密码" v-model="postForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="handlePost">登录</el-button>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <router-link :to="{name: 'Home', query:{type: 'register'}}" type="warning">注册账户</router-link>
            </el-col>
            <el-col :span="12" style="text-align:right">
              <router-link :to="{name: 'Home', query:{type: 'forget'}}" type="warning">忘记密码</router-link>
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
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
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
          this.$router.push({name: 'SceneList'})
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
