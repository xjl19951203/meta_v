<template>
  <div class="Login">
    <el-card class="box-card">
      <div class="Title">
        账户注册
      </div>
      <el-divider></el-divider>
      <el-form ref="form" :model="postForm" :rules="rules">
        <el-form-item prop="userName">
          <el-input prefix-icon="el-icon-user" placeholder="用户名" v-model="postForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" placeholder="密码" type="password" v-model="postForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="passwordAgain">
          <el-input prefix-icon="el-icon-lock" placeholder="确认密码" type="password" v-model="postForm.passwordAgain" autocomplete="off"></el-input>
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
</template>
<script>
import api from 'api'
export default {
  name: 'Login',
  data () {
    return {
      postForm: {
        userName: '',
        password: '',
        passwordAgain: ''
      },
      rules: {
        userName: [
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
          let args = {
            url: 'register',
            params: this.postForm
          }
          api.post(args).then(res => {
            if (res === '') {
              this.$message.error('账户名或密码错误')
            } else {
              this.$store.commit('login', res)
              this.$router.push({name: 'SceneDataList'})
            }
          })
        } else {
          this.$message.error('错误')
          return false
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
</style>
