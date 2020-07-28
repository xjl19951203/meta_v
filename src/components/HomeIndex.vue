<template>
  <div class="HomeIndex">
    <h1>
      欢迎访问基础制造工艺资源环境负荷数据库
    </h1>
    <div class="wrapperHome">
      <el-row :gutter="24">
        <el-col :span="12" v-for="sub in navList" :key="sub.index">
          <router-link :to="{name: 'Home', params: {categoryId: sub['categoryId']}}">
            <el-card always="always">
              <i class="fa fa-fw fa-database"></i> {{ sub['title'] }}
            </el-card>
          </router-link>
        </el-col>
        <el-col :span="24">
          <el-card class="add">
            <el-button type="text" @click="handleAdd">
              <i class="fa fa-fw fa-plus-circle"></i> 添加数据库
            </el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  data () {
    return {
      navList: [
        {
          title: '机加工数据库',
          categoryId: 2,
          name: 'Home'
        },
        {
          title: '热处理数据库',
          categoryId: 3,
          name: 'Home'
        },
        {
          title: '焊接数据库',
          categoryId: 4,
          name: 'Home'
        },
        {
          title: '铸造数据库',
          categoryId: 5,
          name: 'Home'
        }
      ]
    }
  },
  methods: {
    handleAdd () {
      this.$message.warning('新增数据库功能暂未开放')
    }
  }
}
</script>

<style lang="scss">
  .HomeIndex{
    h1{
      margin-bottom: 50px;
    }
    .wrapperHome{
      max-width: 850px;
      max-height: 500px;
      margin: 50px 475px 0 475px;
      a{
        font-weight: bolder;
        font-size: larger;
        text-align: center!important;
        &:hover{
          .el-card{
            background: darkslategray!important;
            color: #ffffff;
          }
        }
      }
      .el-row{
        /*margin: 50px 0;*/
      }
      .el-card__body{
        padding: 50px;
        text-align: center!important;
        i{
          font-size: x-large;
        }
      }
      .el-card{
        margin-bottom: 10px!important;
      }
      .add .el-card__body{
        padding: 30px!important;
      }
    }
  }
</style>
