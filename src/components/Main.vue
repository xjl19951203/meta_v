<template>
  <el-container class="Main">
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside>
        <Navigation></Navigation>
      </el-aside>
      <div class="Wrapper">
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </div>
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
      width: fit-content!important;
      min-width: 200px;
      height: 100%;
      max-height: 100%;
      background-color: #4A524F;
    }
    .el-main{
      height: 100%;
      max-height: 100%;
    }
    .Wrapper{
      height: 100%;
      max-height: 100%;
    }
  }
</style>
