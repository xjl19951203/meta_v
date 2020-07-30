<template>
  <div class="Login">
    <div class="box">
      <el-card class="card">
        <div class="title">
          账户登录
        </div>
        <el-divider></el-divider>
        <el-form ref="form" :model="postForm" :rules="rules">
          <el-form-item prop="email">
            <el-input prefix-icon="el-icon-message" placeholder="邮箱" v-model="postForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" type="password" placeholder="密码" v-model="postForm.password" @keyup.enter.native="handlePost"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="handlePost">登录</el-button>
          </el-form-item>
          <el-row>
            <el-col :span="5">
              <router-link :to="{name: 'Home', query:{type: 'register'}}" type="warning">注册账户</router-link>
            </el-col>
            <el-col :span="9" style="text-align:right">
              <router-link :to="{name: 'Home', query:{type: 'forget'}}" type="warning">忘记密码</router-link>
            </el-col>
            <el-col :span="9" style="text-align:right">
              <router-link :to="{name: 'HomeIndex'}">系统首页</router-link>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import api from 'api'
export default {
  name: 'Login',
  props: {
    categoryId: {}
  },
  data () {
    return {
      postForm: {
        userName: '',
        email: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填写邮箱', trigger: 'blur' },
          { type: 'string',
            message: '邮箱格式不正确',
            trigger: 'blur',
            transform (value) {
              if (!/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)) {
                return true
              } else {
              }
            }
          },
          { type: 'string', message: '长度不能超过25位', trigger: 'blur', max: 25 }
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
          let args = {
            url: 'login',
            params: this.postForm
          }
          api.post(args).then(res => {
            if (res === '') {
              this.$message.error('账户名或密码错误!')
            } else {
              this.$store.commit('login', res)
              this.$router.push({name: 'Home', params: {categoryId: this.categoryId}})
            }
          })
        } else {
          this.$message.error('错误')
          history.go(0)
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
    .Login{
    height: 100%;
    width: 100%;
    .box{
      display: flex;
      justify-content: center;
      margin-top: 50px
    }
    .card{
      /*border-color: #409EFF;*/
      width: 500px;
      height: 350px;
    }
    .title{
      display: flex;
      justify-content: center;
      font-size: 26px;
      font-weight: 700;
      color: dodgerblue;
    }
  }
</style>
