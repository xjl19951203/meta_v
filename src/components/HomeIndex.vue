<template>
  <div class="HomeIndex">
    <h1>
      欢迎来到，基础制造工艺资源环境负荷数据库
    </h1>
    <div class="wrapper">
      <el-row :gutter="20" v-for="sub in navList" :key="sub.title">
        <el-col :span="12">
          <router-link :to="{name: 'Home'}">
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
<!--  <div>-->
<!--    <div class="title">基础制造工艺资源环境负荷数据库</div>-->
<!--    <div class="Wrap">-->
<!--      <div class="buttonTag">-->
<!--        <el-button v-for="item in navList" :key="item.index" class="my-btn" type="primary" plain>-->
<!--          <router-link :to="{name: item['name']}">-->
<!--            {{item['title']}}-->
<!--          </router-link>-->
<!--        </el-button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--      <el-row :gutter="50">-->
<!--        <el-col  v-for="item in navList" :key="item.index">-->
<!--          <el-card shadow="hover">-->
<!--            <div>{{item.title}}</div>-->
<!--            <div><i class="el-icon-coin"></i></div>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--      </el-row>-->
</template>

<script>
export default {
  name: 'HomeIndex',
  data () {
    return {
      navList: [
        {
          title: '机加工数据库',
          name: 'Home'
        },
        {
          title: '热处理数据库',
          name: 'Home'
        },
        {
          title: '焊接数据库',
          name: 'Home'
        },
        {
          title: '铸造数据库',
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
  }
  /*.title {*/
  /*  text-align:center;*/
  /*  font-size: 50px;*/
  /*  color: cornflowerblue;*/
  /*  margin: 40px;*/
  /*}*/
  /*.Wrap {*/
  /*  position: relative;*/
  /*  margin: 30px auto;*/
  /*  left: 0;*/
  /*  top: 0;*/
  /*  right: 0;*/
  /*  bottom: 0;*/
  /*  width: 1250px;*/
  /*  height: 200px;*/
  /*  box-sizing: border-box;*/
  /*}*/
  /*.buttonTag {*/
  /*  display: flex;*/
  /*  flex-wrap: wrap;*/
  /*  justify-content: center;*/
  /*}*/
  /*.my-btn {*/
  /*  margin: 80px 200px !important;*/
  /*  transform: scale(3);*/
  /*}*/
</style>
