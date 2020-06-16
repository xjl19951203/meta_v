<template>
  <div class="BatchDoc">
    <h1>
      数据批量处理中心
    </h1>
  </div>
</template>

<script>
export default {
  name: 'BatchDoc',
  methods: {
    handleClear () {
      this.$store.commit('clear')
      history.go(0)
    }
  }
}
</script>

<style lang="scss">
  .BatchDoc{
    h1{
      margin: 50px;
      text-align: center;
    }
  }
</style>
