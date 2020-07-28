<template>
  <el-container class="Main">
    <el-header class="title">
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside>
        <Navigation></Navigation>
      </el-aside>
      <el-container>
        <el-main class="Wrapper">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
        <el-footer class="foot">
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import Header from './widgets/Header'
import Navigation from './widgets/Navigation'
import Footer from './widgets/Footer'
export default {
  name: 'Main',
  components: {
    Footer,
    Header,
    Navigation
  }
}
</script>
<style scoped lang="scss">
  /*.center{*/
  /*  margin: 0 auto;*/
  /*}*/
  .Main{
    height: 100%;
    max-height: 100%;
    .title {
      font-size: 25px;
      background: #4A524F;
      font-color: gold;
    }
    .el-container {
      height: 100%;
      width: 100%;
      max-height: 100%;
      max-width: 100%;
      /*height: calc(100% - 60px);*/
      /*max-height: calc(100% - 60px);*/
    }
    .el-aside{
      width: fit-content!important;
      /*min-width: 200px;*/
      height: 100%;
      max-height: 100%;
      background-color: #4A524F;
    }
    .el-main{
      height: 100%;
      width: 100%;
      max-height: 100%;
      max-width: 100%;
    }
    .foot{
      padding: 0;
      height: 100%;
      width: 100%;
      max-height: 100%;
      max-width: 100%;
    }
  }
</style>
