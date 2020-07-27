<template>
<!--  <el-row class="Home">-->
<!--    <el-col class="Left" :span="12">-->
<!--      <div class="Title">基础制造工艺资源环境负荷数据库</div>-->
<!--      <div class="Wrap">-->
<!--        <el-row :gutter="50">-->
<!--          <el-col :span="12" v-for="item in navList" :key="item.index">-->
<!--            <el-card shadow="hover">-->
<!--              <div>{{item.title}}</div>-->
<!--              <div><i class="el-icon-coin"></i></div>-->
<!--            </el-card>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </div>-->
<!--    </el-col>-->
<!--    <el-col class="Right" :span="12">-->
<!--      <div class="Wrap">-->
<!--        <p v-if="auth" style="text-align: center">-->
<!--          <router-link :to="{name: 'User'}">-->
<!--            <el-avatar :size="100">{{auth['userName']}}</el-avatar>-->
<!--          </router-link>-->
<!--        </p>-->
<!--        <el-row :gutter="25" v-if="auth">-->
<!--          <el-col :span="4.8" v-for="item in list" :key="item.index">-->
<!--            <router-link :to="{name: item['name']}">-->
<!--             <el-card shadow="hover" style="text-align: center">-->
<!--              {{item['title']}}-->
<!--            </el-card>-->
<!--            </router-link>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <Login v-else-if="type === 'login'"></Login>-->
<!--        <Register v-else-if="type === 'register'"></Register>-->
<!--      </div>-->
<!--    </el-col>-->
<!--  </el-row>-->
  <div class="Home">
    <div class="Wrap">
      <h3 v-if="title">
        欢迎进入{{title}}工艺资源环境负荷数据库
      </h3>
      <h3 v-else>
        欢迎进入基础制造工艺资源环境负荷数据库
      </h3>
      <div class="wrapper">
        <p v-if="auth" style="text-align: center">
          <router-link :to="{name: 'User'}">
            <el-avatar :size="200">
              <div class="font">{{auth['userName']}}</div>
              <!--              <el-tag hit="false" color="#BFC3CB">{{auth['userName']}}</el-tag>-->
            </el-avatar>
          </router-link>
        </p>
        <div v-if="auth">
          <el-row :gutter="20">
            <el-col :span="12">
              <router-link :to="{name: 'SceneDataList'}">
                <el-card always="always">
                  工艺场景管理
                </el-card>
              </router-link>
            </el-col>
            <el-col :span="12">
              <router-link :to="{name: 'ManageIndex'}">
                <el-card always="always">
                  基础数据管理
                </el-card>
              </router-link>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <router-link :to="{name: 'BatchDoc'}">
                <el-card always="always">
                  批量数据处理
                </el-card>
              </router-link>
            </el-col>
            <el-col :span="8">
              <router-link :to="{name: 'SearchIndex'}">
                <el-card always="always">
                  <i class="fa fa-fw fa-search"></i> 数据查询
                </el-card>
              </router-link>
            </el-col>
            <el-col :span="8">
              <router-link :to="{name: 'User'}">
                <el-card always="always">
                  <i class="fa fa-fw fa-users"></i> 用户管理
                </el-card>
              </router-link>
            </el-col>
          </el-row>
        </div>
        <!--      <div class="buttonTag" v-if="auth">-->
        <!--        <el-button @click="enterSceneMenu" class="my-btn" type="primary" plain>-->
        <!--          工艺场景管理-->
        <!--        </el-button>-->
        <!--        <el-button @click="enterBaseMenu" class="my-btn" type="primary" plain>-->
        <!--          基础数据管理-->
        <!--        </el-button>-->
        <!--        <el-button @click="enterBatchMenu" class="my-btn" type="primary" plain>-->
        <!--          数据批处理-->
        <!--        </el-button>-->
        <!--        <el-button @click="enterSearchMenu" class="my-btn" type="primary" plain>-->
        <!--          数据查询-->
        <!--        </el-button>-->
        <!--        <el-button @click="enterUserMenu" class="my-btn" type="primary" plain>-->
        <!--          用户管理-->
        <!--        </el-button>-->
        <!--        &lt;!&ndash;          <el-button v-for="item in list" :key="item.index" class="my-btn" type="primary" plain>&ndash;&gt;-->
        <!--        &lt;!&ndash;            <router-link :to="{name: item['name']}">&ndash;&gt;-->
        <!--        &lt;!&ndash;              {{item['title']}}&ndash;&gt;-->
        <!--        &lt;!&ndash;            </router-link>&ndash;&gt;-->
        <!--        &lt;!&ndash;          </el-button>&ndash;&gt;-->
        <!--      </div>-->
        <Login v-else-if="type === 'login'"></Login>
        <Register v-else-if="type === 'register'"></Register>
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
    },
    title () {
      let temp = null
      this.$store.state.categories[0]['children'].forEach(item => {
        if (parseInt(this.categoryId) === item['id']) {
          temp = item['title']
        }
      })
      return temp
    }
  },
  data () {
    return {
      categoryId: 0,
      functionName: '',
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
      vm.categoryId = to.params['categoryId']
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
  },
  methods: {
    enterSceneMenu () {
      this.$router.push('/sceneDataList')
    },
    enterBaseMenu () {
      this.$router.push('/manage')
    },
    enterSearchMenu () {
      this.$router.push('/search')
    },
    enterBatchMenu () {
      this.$router.push('/batch/doc')
    },
    enterUserMenu () {
      this.$router.push('/user')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  /*.Home{*/
  /*  height: 100%;*/
  /*}*/
  /*.Wrap{*/
  /*  position: relative;*/
  /*  margin:  30px auto;*/
  /*  left:0;*/
  /*  top:0;*/
  /*  right: 0;*/
  /*  bottom: 0;*/
  /*  width: 1250px;*/
  /*  height: 750px;*/
  /*  box-sizing: border-box;*/
  /*  a{*/
  /*    text-decoration: none;*/
  /*    color: #409EFF !important;*/
  /*    !*font-weight: bold;*!*/
  /*    &:hover{*/
  /*      color:#fff !important;*/
  /*    }*/
  /*  }*/
  /*  .buttonTag{*/
  /*    display: flex;*/
  /*    flex-wrap: wrap;*/
  /*    justify-content: center;*/
  /*    .my-btn{*/
  /*      margin:70px 120px !important;*/
  /*      transform: scale(2.5);*/
  /*    }*/
  /*  }*/
  /*  .font{*/
  /*    word-break:break-all;*/
  /*    word-wrap:break-word;*/
  /*    font-size: 37px;*/
  /*    color: cornflowerblue;*/
  /*  }*/
    /*a{*/
    /*  text-decoration: none;*/
    /*}*/
    /*.buttonTag{*/
    /*  text-align: center;*/
    /*}*/
    /*.el-col{*/
    /*  height: 100%;*/
    /*}*/
    /*.Wrap{*/
    /*  max-width: 600px!important;*/
    /*  margin: auto;*/
    /*}*/
    /*.Login{*/
    /*  .Title{*/
    /*    font-size: larger;*/
    /*    font-weight: bolder;*/
    /*  }*/
    /*  .el-button{*/
    /*    width: 100%;*/
    /*  }*/
    /*}*/
    /*.Left{*/
    /*  background-color: #4A524F;*/
    /*  color: #fff;*/
    /*  .Title{*/
    /*    text-align: center;*/
    /*    padding: 60px 0;*/
    /*    margin-bottom: 50px;*/
    /*    font-size: 35px;*/
    /*  }*/
    /*  .Wrapper{*/
    /*    max-width: 300px!important;*/
    /*  }*/
    /*  .el-col{*/
    /*    height: 200px;*/
    /*    .el-card{*/
    /*      background: transparent;*/
    /*      height: 160px;*/
    /*      font-size: x-large;*/
    /*      text-align: center;*/
    /*      color: #aaa;*/
    /*      border-color: #888;*/
    /*      i{*/
    /*        display: block;*/
    /*        font-size: 60px;*/
    /*        padding: 30px 0;*/
    /*      }*/
    /*    }*/
    /*  }*/
    /*}*/
    /*.Right{*/
    /*  padding-top: 200px;*/
    /*}
    /*}*/
</style>
