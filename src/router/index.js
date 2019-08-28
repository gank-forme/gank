import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'


import nodeConfig from '@/components/node/config'
import nodeUpdate from '@/components/node/update'
import nodeManage from '@/components/node/manage'
import nodeAdd from '@/components/node/add'
import nodeDist from '@/components/node/dist'
import webDist from '@/components/node/dist0'


import javaAdd from '@/components/java/add'
import javaGit from '@/components/java/git'
import javaPkg from '@/components/java/pkg'
import javaManage from '@/components/java/manage'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
        {
          path: '/home',
          name: 'home',
          component: home
        }
      ]
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
        {
          path: '/',
          name: 'home',
          component: home
        },
        {
          path: '/nodeCofig',
          name: 'nodeConfig',
          component: nodeConfig
        },
        {
          path: '/nodeUpdate',
          name: 'nodeUpdate',
          component: nodeUpdate
        },
        {
          path: '/nodeManage',
          name: 'nodeManage',
          component: nodeManage
        },
        {
          path: '/nodeAdd',
          name: 'nodeAdd',
          component: nodeAdd
        },
        {
          path: '/nodeDist',
          name: 'nodeDist',
          component: nodeDist
        },
        {
          path: '/webDist',
          name: 'webDist',
          component: webDist
        },
        {
          path: '/javaAdd',
          name: 'javaAdd',
          component: javaAdd
        },
        {
          path: '/javaPkg',
          name: 'javaPkg',
          component: javaPkg
        },
        {
          path: '/javaGit',
          name: 'javaGit',
          component: javaGit
        },
        {
          path: '/javaManage',
          name: 'javaManage',
          component: javaManage
        },
      ]
    }
  ]
})
