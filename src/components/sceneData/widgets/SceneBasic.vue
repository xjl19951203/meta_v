<template>
  <el-card class="hover SceneBasic">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/sceneDataList' }">所有工艺场景</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'SceneDataList', params: {categoryId: sceneData['categoryId']}}">{{sceneData['category'] ? sceneData['category']['title'] : ''}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'SceneData', params:{sceneDataId: sceneData['id']}}">{{sceneData['title']}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div>工艺场景描述: {{sceneData['description']}}</div>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'SceneBasic',
  props: {
    sceneData: {
      type: Object,
      default () {
        return {
          category: {
            title: ''
          }
        }
      }
    }
  }
}
</script>
<style scoped>

</style>
