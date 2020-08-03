<template>
  <div class="User">
    <el-button @click="handleLogout">退出登录</el-button>
    <el-button @click="handleClear">
      清理缓存
    </el-button>
  </div>
</template>
<script>
export default {
  name: 'User',
  methods: {
    handleLogout () {
      this.$store.commit('logout')
      this.$router.push({name: 'HomeIndex'})
    },
    handleClear () {
      this.$store.commit('clear')
      history.go(-1)
      // this.$router.push({name: 'HomeIndex'})
    }
  }
}
</script>
<style scoped>

</style>
