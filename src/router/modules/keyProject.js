/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout/index.vue'

export const keyProject = [
  {
    path: '/keyproject',
    component: Layout,
    redirect: '/keyproject/index',
    name: 'keyproject',
    meta: {
      icon: 'el-icon-folder-opened',
      title: '重点项目管理',
    },
    children: [
      {
        path: 'portrait',
        name: 'portrait',
        component: () => import('@/pages/keyProjects/projectPortrait/index'),
        meta: { title: '项目画像', icon: 'el-icon-folder-add' },
      },
      {
        path: 'index',
        component: () => import('@/pages/keyProjects/index'), // Parent router-view
        name: 'keyproject',
        meta: { title: '重点项目库', icon: 'el-icon-folder-add' },
      },
      {
        path: 'addproject',
        component: () => import('@/pages/keyProjects/keyproject/addProject'), // Parent router-view
        name: 'addproject',
        hidden: true,
        meta: { title: '新建项目' },
      },
      {
        path: 'editproject',
        component: () => import('@/pages/keyProjects/keyproject/addProject'), // Parent router-view
        name: 'editproject',
        hidden: true,
        meta: { title: '编辑项目' },
      },
      {
        path: 'seeproject',
        component: () => import('@/pages/keyProjects/keyproject/seeProject'), // Parent router-view
        name: 'seeproject',
        hidden: true,
        meta: { title: '查看项目' },
      },
      {
        path: 'projectfile',
        component: () => import('@/pages/keyProjects/keyproject/projectFile'), // Parent router-view
        name: 'projectfile',
        hidden: true,
        meta: { title: '项目文件归档', icon: 'el-icon-folder-add' },
      },
      {
        path: 'intention',
        component: () => import('@/pages/keyProjects/intentionProject/index'), // Parent router-view
        name: 'intention',
        meta: { title: '意向项目库', icon: 'el-icon-folder-add' },
      },
      {
        path: 'progress',
        component: () => import('@/pages/keyProjects/projectProgress/index'), // Parent router-view
        name: 'progress',
        meta: { title: '项目进展概览', icon: 'el-icon-folder-add' },
      },
    ],
  },
]
