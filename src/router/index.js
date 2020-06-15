import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Main from '../components/Main'
import SceneDataList from '../components/sceneData/SceneDataList'
import SceneData from '../components/sceneData/SceneData'
import SceneFrameData from '../components/sceneData/SceneFrameData'

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
        }
      ]
    }
  ]
})
