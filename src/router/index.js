import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Main from '../components/Main'
import SceneList from '../components/scene/SceneList'
import Scene from '../components/scene/Scene'
import SceneFrame from '../components/scene/SceneFrame'

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
          path: '/scene',
          name: 'SceneList',
          component: SceneList
        },
        {
          path: '/scene/:sceneDataId',
          name: 'Scene',
          component: Scene
        },
        {
          path: '/scene/:sceneDataId/inputFrame/:inputFrameId',
          name: 'SceneFrame',
          component: SceneFrame
        }
      ]
    }
  ]
})
