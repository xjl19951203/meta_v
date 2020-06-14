<template>
  <el-row class="Home">
    <el-col class="Left" :span="12">
      <div class="Title">基础制造工艺资源环境负荷数据库</div>
      <div class="Wrapper">
        <el-row :gutter="50">
          <el-col :span="12" v-for="item in navList" :key="item.index">
            <el-card shadow="hover">
              <div>{{item.title}}</div>
              <div><i class="el-icon-coin"></i></div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col class="Right" :span="12">
      <Login v-show="type === 'login'"></Login>
      <Register v-show="type === 'register'"></Register>
    </el-col>
  </el-row>
</template>

<script>
import Login from './widgets/Login'
import Register from './widgets/Register'
export default {
  name: 'Home',
  components: {
    Login,
    Register
  },
  data () {
    return {
      type: 'login',
      navList: [
        {
          title: '机加工数据库'
        },
        {
          title: '热处理数据库'
        },
        {
          title: '焊接数据库'
        },
        {
          title: '铸造数据库'
        }
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.query['type'] === 'register') {
        vm.type = 'register'
      } else if (to.query['type'] === 'forget') {
        vm.type = 'forget'
      } else {
        vm.type = 'login'
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    if (to.query['type'] === 'register') {
      this.type = 'register'
    } else if (to.query['type'] === 'forget') {
      this.type = 'forget'
    } else {
      this.type = 'login'
    }
    next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .Home{
    height: 100%;
    .el-col{
      height: 100%;
    }
    .Login{
      .Wrapper{
        max-width: 400px!important;
        margin: auto;
      }
      .Title{
        font-size: larger;
        font-weight: bolder;
      }
      .el-button{
        width: 100%;
      }
    }
    .Left{
      background-color: #4A524F;
      color: #fff;
      .Title{
        text-align: center;
        padding: 60px 0;
        margin-bottom: 50px;
        font-size: 35px;
      }
      .Wrapper{
        max-width: 600px!important;
      }
      .el-col{
        height: 200px;
        .el-card{
          background: transparent;
          height: 160px;
          font-size: x-large;
          text-align: center;
          color: #aaa;
          border-color: #888;
          i{
            display: block;
            font-size: 60px;
            padding: 30px 0;
          }
        }
      }
    }
    .Right{
      padding-top: 200px;
    }
  }
</style>
