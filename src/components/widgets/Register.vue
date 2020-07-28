<template>
  <div class="Register">
    <div class="box">
      <el-card class="card">
        <div class="title">
          账户注册
        </div>
        <el-divider></el-divider>
        <el-form ref="form" :model="postForm" :rules="rules">
          <el-form-item prop="userName">
            <el-input prefix-icon="el-icon-user" placeholder="用户名" v-model="postForm.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input prefix-icon="el-icon-message" placeholder="注册邮箱(登录账号)" v-model="postForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" placeholder="密码" type="password" v-model="postForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="passwordAgain">
            <el-input prefix-icon="el-icon-lock" placeholder="确认密码" type="password" v-model="postForm.passwordAgain" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col>
                <el-button type="success" @click="handlePost">注册</el-button>
                <router-link :to="{name: 'Home', query:{type: 'login'}}" type="warning" class="routeLink">前往登录</router-link>
              </el-col>
            </el-row>
          </el-form-item>
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
        password: '',
        passwordAgain: '',
        email: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        passwordAgain: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
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
              this.$message.error('当前用户名或邮箱已被注册!')
            } else {
              this.$store.commit('login', res)
              this.$router.push({name: 'Home', params: {categoryId: this.categoryId}})
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
  .Register{
    height: 100%;
    max-height: 100%;
    .box{
      display: flex;
      justify-content: center;
      margin-top: 40px;
    }
    .card{
      width: 500px;
      height: 500px;
    }
    .title{
      display: flex;
      justify-content: center;
      font-size: 26px;
      font-weight: 700;
      color: dodgerblue;
    }
    .routeLink{
      margin: 0 0 0 150px;
    }
  }
</style>
