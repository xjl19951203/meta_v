<template>
  <div>
    <el-card shadow="hover" class="box-card SearchItem">
      <el-row>
        <el-col :span="12">
          <el-tag :type="typeMap[item['modelType']]['tagType']">
            {{typeMap[item['modelType']]['title']}}
          </el-tag>
          <el-tag class="title" @click="routerData">
            {{item['title']}}
          </el-tag>
<!--          下面是另一种方式实现-->
<!--          <router-link v-if="item['modelType'] !== 'scene'" class="title" type="text" :to="{name: typeMap[item['modelType']]['router']['name'],-->
<!--           params: typeMap[item['modelType']]['router']['params'],-->
<!--           query: typeMap[item['modelType']]['router']['query']}">-->
<!--            {{item['title']}}-->
<!--          </router-link>-->
        </el-col>
        <el-col v-if="item['modelType'] === 'scene'" :span="12" style="text-align: right; font-size: 16px;color: #999999">
          创建时间：{{item['createdAt']}}
          更新时间：{{item['updatedAt']}}
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <div class="description">
        {{item['description']}}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SearchItem',
  props: {
    item: {
      type: Object
    },
    list: {}
  },
  data () {
    return {
      typeMap: {
        scene: {
          title: '工艺场景',
          tagType: 'success',
          router: {
            name: 'SceneData',
            query: {
              id: this.item['id']
            }
          }
        },
        material: {
          title: '物料',
          tagType: 'primary',
          router: {
            name: 'ManageEdit',
            params: {
              table: 'material'
            }
          }
        },
        device: {
          title: '设备',
          tagType: 'warning',
          router: {
            name: 'ManageEdit',
            params: {
              table: 'device'
            }
          }
        },
        energy: {
          title: '能源',
          tagType: 'info',
          router: {
            name: 'ManageEdit',
            params: {
              table: 'energy'
            }
          }
        },
        env_load: {
          title: '环境负荷',
          tagType: 'danger',
          router: {
            name: 'ManageEdit',
            params: {
              table: 'env_load'
            }
          }
        }
      }
    }
  },
  methods: {
    routerData () {
      // this.$router.push({name: 'SearchItem', query: {searchType: this.searchForm.searchType, dataType: this.searchForm.dataType, content: this.searchForm.content}})
      let path
      if (this.item['modelType'] === 'scene') {
        path = 'sceneData/' + this.item.id
        this.$router.push(path)
      } else if (this.item['modelType'] === 'material') {
        this.$router.push({name: 'Manage', params: {tableName: 'material', tableList: this.list}})
      } else if (this.item['modelType'] === 'energy') {
        this.$router.push({name: 'Manage', params: {tableName: 'energy', tableList: this.list}})
      } else if (this.item['modelType'] === 'device') {
        this.$router.push({name: 'Manage', params: {tableName: 'device', tableList: this.list}})
      } else if (this.item['modelType'] === 'env_load') {
        this.$router.push({name: 'Manage', params: {tableName: 'envLoad', tableList: this.list}})
      }
      // } else if (this.item['modelType'] === 'material') {
      //   path = 'manage/material'
      // } else if (this.item['modelType'] === 'energy') {
      //   path = 'manage/energy'
      // } else if (this.item['modelType'] === 'device') {
      //   path = 'manage/device'
      // } else if (this.item['modelType'] === 'env_load') {
      //   path = 'manage/envLoad'
      // }
      // this.$router.push(path)
    }
  }
}
</script>

<style lang="scss">
  .SearchItem{
    border: solid 1px #ddd;
    margin: 20px 0;
    .title{
      display: inline-block;
      font-weight: bolder;
      font-size: large;
      padding: 0 10px;
    }
    .description {
      color: #999;
      font-size: 14px;
    }
    a{
      text-decoration: underline;
      &:hover{
        color: gold;
      }
    }
  }
</style>
