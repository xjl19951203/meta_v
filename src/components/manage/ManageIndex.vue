<template>
  <div class="ManageIndex">
    <h1 class="h1">
      基础数据管理中心
    </h1>
    <el-divider></el-divider>
    <el-row :gutter="12" v-for="sub in navList" :key="sub.index">
      <el-col :span="20">
        <el-tag class="tag" v-if="sub.title === '基础表'" type="success">{{sub.title}}</el-tag>
        <el-tag class="tag" v-if="sub.title === '辅助表'" type="info">{{sub.title}}</el-tag>
      </el-col>
      <el-col :span="6" v-for="item in systemTable" :key="item.index" v-show="item['tableComment'].split('_')[0] === sub.title">
        <router-link :to="{name: 'Manage', params: {tableName: item['tableName']}}" >
          <el-card always="always">
            {{item['tableComment'].split('_')[1]}}
          </el-card>
        </router-link>
      </el-col>
      <el-col :span="24">
        <el-divider></el-divider>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ManageIndex',
  computed: {
    systemTable () {
      return this.$store.state.systemTable
    }
  },
  data () {
    return {
      navList: [
        {
          title: '基础表',
          icon: 'dashboard'
        },
        // {
        //   title: '数据表',
        //   icon: 'database'
        // },
        {
          title: '辅助表',
          icon: 'gears'
        }
        // {
        //   title: '用户相关表',
        //   icon: 'users'
        // }
      ]
    }
  }
}
</script>

<style lang="scss">
  .ManageIndex{
    width: 100%;
    height: 100%;
    h1{
      text-align: center;
      margin: 20px 20px 20px 20px;
      color: cornflowerblue;
      font-size: 30px;
    }
    .tag{
      display: inline-block;
      font-weight: bolder;
      font-size: large;
      padding: 0 10px;
    }
    .el-row{
      width: 100%;
    }
    .el-card{
      margin-bottom: 20px!important;
    }
    a{
      font-weight: bolder;
      text-align: center!important;
      &:hover{
        .el-card{
          background: darkslategray!important;
          color: #ffffff;
        }
      }
    }
  }
</style>
