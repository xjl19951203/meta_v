<template>
  <div>
    <div class="title">基础制造工艺资源环境负荷数据库</div>
    <div class="Wrap">
      <div class="buttonTag">
        <el-button v-for="item in navList" :key="item.index" class="my-btn" type="primary" plain>
          <router-link :to="{name: item['name']}">
            {{item['title']}}
          </router-link>
        </el-button>
      </div>
    </div>
  </div>
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
  }
}
</script>

<style scoped>
  .title {
    text-align:center;
    font-size: 50px;
    color: cornflowerblue;
    margin: 40px;
  }
  .Wrap {
    position: relative;
    margin: 30px auto;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1000px;
    height: 200px;
    box-sizing: border-box;
  }
  .buttonTag {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .my-btn {
    margin: 80px 300px !important;
    transform: scale(4);
  }
</style>
