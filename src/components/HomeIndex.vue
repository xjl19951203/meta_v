<template>
  <el-col class="Left" :span="12">
    <div class="Title">基础制造工艺资源环境负荷数据库</div>
    <div class="Wrap">
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
</template>

<script>
export default {
  name: 'HomeIndex'
}
</script>

<style scoped>

</style>
