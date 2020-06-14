<template>
  <el-container class="Main">
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside>
        <Navigation></Navigation>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Header from './widgets/Header'
import Navigation from './widgets/Navigation'
export default {
  name: 'Main',
  components: {
    Header,
    Navigation
  }
}
</script>
<style scoped lang="scss">
  .Main{
    height: 100%;
    max-height: 100%;
    .el-container {
      height: calc(100% - 60px);
      max-height: calc(100% - 60px);
    }
    .el-aside{
      width: 200px!important;
      height: 100%;
      max-height: 100%;
    }
    .el-main{
      height: 100%;
      max-height: 100%;
    }
  }
</style>
