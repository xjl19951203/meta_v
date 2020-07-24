import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Main from '../components/Main'
import SceneDataList from '../components/sceneData/SceneDataList'
import SceneData from '../components/sceneData/SceneData'
import SceneFrameData from '../components/sceneData/SceneFrameData'
import BatchDoc from '../components/batch/BatchDoc'
import BatchImport from '../components/batch/BatchImport'
import BatchExport from '../components/batch/BatchExport'
import Manage from '../components/manage/Manage'
import User from '../components/user/User'
import Search from '../components/search/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/main',
      component: Main,
      children: [
        {
          path: '/sceneDataList',
          name: 'SceneDataList',
          component: SceneDataList
        },
        {
          path: '/sceneData/:sceneDataId',
          name: 'SceneData',
          component: SceneData
        },
        {
          path: '/sceneData/:sceneDataId/inputFrameData/:inputFrameDataId',
          name: 'SceneFrameData',
          component: SceneFrameData
        },
        {
          path: '/batch/doc',
          name: 'BatchDoc',
          component: BatchDoc
        },
        {
          path: '/batch/import',
          name: 'BatchImport',
          component: BatchImport
        },
        {
          path: '/batch/export',
          name: 'BatchExport',
          component: BatchExport
        },
        {
          path: '/manage/:tableName',
          name: 'Manage',
          component: Manage
        },
        {
          path: '/user',
          name: 'User',
          component: User
        },
        {
          path: '/search',
          name: 'Search',
          component: Search,
          meta: {
            keepalive: true
          }
        }
      ]
    }
  ]
})
