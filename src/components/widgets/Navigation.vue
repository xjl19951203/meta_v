<template>
  <div class="Navigation">
    <el-tree
     :data="sceneTree"
     :props="defaultProps"
     :default-expand-all="false"
     icon-class="el-icon-folder-opened"
     @node-click="handleScene">
    </el-tree>
    <el-tree
     :data="baseTree"
     :props="defaultProps"
     :default-expand-all="false"
     icon-class="el-icon-folder-opened"
     @node-click="handleBase">
    </el-tree>
    <el-tree
     :data="navTree"
     :props="defaultProps"
     :default-expand-all="false"
     icon-class="el-icon-folder-opened"
     @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>
<script>
export default {
  name: 'Navigation',
  computed: {
    sceneTree () {
      let temp = this.$store.state.categories
      return [{
        title: '工艺场景',
        id: null,
        name: 'SceneDataList',
        children: temp[0]['children']
      }]
    },
    baseTree () {
      let temp = this.$store.state.systemTable
      let arr1 = []
      let arr2 = []
      for (let key of Object.keys(temp)) {
        let item = temp[key]
        if (item['tableComment'].split('_')[0] === '基础表') {
          item['title'] = item['tableComment'].split('_')[1]
          arr1.push(item)
        } else if (item['tableComment'].split('_')[0] === '辅助表') {
          item['title'] = item['tableComment'].split('_')[1]
          arr2.push(item)
        }
      }
      return [{
        title: '基础数据',
        children: [
          {
            title: '基础表',
            children: arr1
          },
          {
            title: '辅助表',
            children: arr2
          }
        ]
      }]
    },
    navTree () {
      let temp = [
        {
          title: '数据批处理',
          children: [
            {
              title: '导入规范',
              icon: 'file-text-o',
              name: 'BatchDoc'
            },
            {
              title: '批量导入',
              icon: 'upload',
              name: 'BatchImport'
            },
            {
              title: '批量导出',
              icon: 'download',
              name: 'BatchExport'
            }
          ]
        },
        {
          title: '数据查询',
          name: 'Search'
        },
        {
          title: '用户管理',
          children: [
            {
              title: '用户信息',
              icon: 'vcard-o',
              name: 'UserIndex'
            },
            {
              title: '分组管理',
              icon: 'users',
              name: 'UserGroup'
            },
            {
              title: '权限管理',
              icon: 'key',
              name: 'UserPermission'
            }
          ]
        }
      ]
      return temp
    }
  },
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  methods: {
    handleScene (data) {
      // if (data['id'] !== undefined) {
      this.$router.push({name: 'SceneDataList', query: {category: data['id']}})
      // }
    },
    handleBase (data) {
      console.log(data['tableName'])
      if (data['tableName'] !== undefined) {
        this.$router.push({name: 'Manage', params: {tableName: data['tableName']}})
      } else {
        this.$router.push({name: 'ManageIndex'})
      }
    },
    handleNodeClick (data) {
      if (data['name'] !== undefined) {
        this.$router.push({name: data['name']})
      }
    }
  }
}
</script>
<style lang="scss">
  .Navigation{
    padding: 10px;
    width: fit-content;
    height: calc(100% - 20px);
    color: #aaa;
    .el-tree{
      color: #aaa;
      background: transparent;
      .el-tree-node__expand-icon{
        font-size: 16px!important;
      }
      .el-tree-node__label{
        font-size: 16px!important;
      }
      .el-tree-node__content{
        height: 35px;
      }
    }
  }
</style>
