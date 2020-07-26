<template>
  <div class="Login">
<!--    <div style="display: flex;justify-content: center;margin-top: 150px">-->
<!--      <el-card style="width: 500px;height: 350px">-->
<!--        <div style="display: flex;justify-content: center;font-size: 26px;font-weight: 700;color: dodgerblue">-->
    <div class="box">
      <el-card class="card">
        <div class="title">
          账户登录
        </div>
        <el-divider></el-divider>
        <el-form ref="form" :model="postForm" :rules="rules">
          <el-form-item prop="userName">
            <el-input prefix-icon="el-icon-user" placeholder="用户名" v-model="postForm.userName"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" type="password" placeholder="密码" v-model="postForm.password" @keyup.enter.native="handlePost"></el-input>
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
import api from 'api'
export default {
  name: 'Login',
  data () {
    return {
      postForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
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
          let args = {
            url: 'login',
            params: this.postForm
          }
          api.post(args).then(res => {
            if (res === '') {
              this.$message.error('账户名或密码错误')
            } else {
              this.$store.commit('login', res)
              // this.$router.push({name: 'SceneDataList'})
              this.$router.push({name: 'HomeIndex'})
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
    .Login{
    height: 100%;
    width: 100%;
    /*position: relative;*/
    .box{
      display: flex;
      justify-content: center;
      margin-top: 150px
      /*margin: 0 auto;*/
      /*<!--position: absolute;-->*/
      /*<!--left: 50%;-->*/
      /*<!--top: 50%;-->*/
      /*<!--transform: translate(-50%, -50%);-->*/
      /*<!--width: 500px;-->*/
      /*<!--height: 350px;-->*/
      /*<!--display: flex;-->*/
      /*<!--justify-content: center;-->*/
      /*margin-inside: auto;*/
    }
    .card{
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
