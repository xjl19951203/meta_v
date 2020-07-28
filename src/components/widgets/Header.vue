<template>
  <el-row class="Header">
    <el-col :span="12">
      <router-link :to="{name: 'Home'}">基础制造工艺资源环境负荷数据库</router-link>
    </el-col>
    <el-col :span="12" style="text-align:right" v-if="auth">
      <router-link :to="{name: 'User'}">{{auth['userName']}}</router-link>
    </el-col>
    <el-col :span="12" style="text-align:right" v-else>
      <router-link :to="{name: 'Home', query: {type: 'login'}}">登录</router-link>
      <router-link :to="{name: 'Home', query: {type: 'register'}}">注册</router-link>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'Header',
  computed: {
    auth () {
      return this.$store.state['auth']
    }
  }
}
</script>
<style scoped lang="scss">
  .Header{
    background: #2D2D2D;
    height: 100%;
    width: 100%;
    line-height: 60px;
    padding: 0 20px;
    color: #aaa;
    a{
      text-decoration: none;
      color: gold;
    }
  }
</style>
