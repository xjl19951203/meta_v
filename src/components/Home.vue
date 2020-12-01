<template>
  <div class="Home">
    <div class="Wrap">
      <h3>
        欢迎进入基础制造工艺资源环境负荷数据库
      </h3>
      <div class="wrapper">
<!--        <p v-if="auth" style="text-align: center">-->
<!--          <router-link :to="{name: 'User'}">-->
<!--            <el-avatar :size="200">-->
<!--              <div class="font">{{auth['userName']}}</div>-->
<!--            </el-avatar>-->
<!--          </router-link>-->
<!--        </p>-->
<!--        <div v-if="auth">-->
<!--          <el-row :gutter="20">-->
<!--            <el-col :span="12">-->
<!--              <router-link :to="{name: 'SceneDataList'}">-->
<!--                <el-card always="always">-->
<!--                  <i class="fa fa-fw fa-cubes"></i>工艺场景管理-->
<!--                </el-card>-->
<!--              </router-link>-->
<!--            </el-col>-->
<!--            <el-col :span="12">-->
<!--              <router-link :to="{name: 'ManageIndex'}">-->
<!--                <el-card always="always">-->
<!--                  <i class="fa fa-fw fa-table"></i>基础数据管理-->
<!--                </el-card>-->
<!--              </router-link>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--          <el-row :gutter="20">-->
<!--            <el-col :span="8">-->
<!--              <router-link :to="{name: 'BatchDoc'}">-->
<!--                <el-card always="always">-->
<!--                  <i class="fa fa-fw fa-download"></i>批量数据处理-->
<!--                </el-card>-->
<!--              </router-link>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <router-link :to="{name: 'Search'}">-->
<!--                <el-card always="always">-->
<!--                  <i class="fa fa-fw fa-search"></i> 数据查询-->
<!--                </el-card>-->
<!--              </router-link>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <router-link :to="{name: 'User'}">-->
<!--                <el-card always="always">-->
<!--                  <i class="fa fa-fw fa-users"></i> 用户管理-->
<!--                </el-card>-->
<!--              </router-link>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </div>-->
        <div v-if="type === 'auth'">

        </div>
        <Login v-else-if="type === 'login'" :categoryId="categoryId"></Login>
        <Register v-else-if="type === 'register'" :categoryId="categoryId"></Register>
      </div>
    </div>
  </div>
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
  computed: {
    auth () {
      return this.$store.state.auth
    }
  },
  data () {
    return {
      title: null,
      categoryId: 1,
      type: 'login',
      list: [
        {
          name: 'SceneDataList',
          path: '/sceneDataList',
          title: '工艺场景管理'
        },
        {
          name: 'ManageIndex',
          path: '/manage',
          title: '基础数据管理'
        },
        {
          name: 'BatchDoc',
          path: '/batch/doc',
          title: '数据批处理'
        },
        {
          name: 'Search',
          path: '/search',
          title: '数据查询'
        },
        {
          name: 'User',
          path: '/user',
          title: '用户管理'
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
      vm.categoryId = to.params['categoryId'] ? to.params['categoryId'] : 1
      let temp = null
      vm.$store.state.categories[0]['children'].forEach(item => {
        if (parseInt(vm.categoryId) === item['id']) {
          temp = item['title']
        }
      })
      vm.title = temp
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

<style lang="scss">
  .Home{
    h3{
      margin: 0 0 50px 0;
      padding: 20px;
      font-size: 25px;
      text-align: center;
      background: #4A524F;
      color: gold;
    }
    .font{
      word-break:break-all;
      word-wrap:break-word;
      font-size: 37px;
      color: cornflowerblue;
    }
  }
</style>
