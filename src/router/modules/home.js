import Layout from '@/layout/index.vue'
export const Home = [
  {
    path: '/projectlist',
    component: Layout,
    redirect: '/projectlist',
    name: 'projectlist',
    meta: {
      title: '项目列表',
      icon: 'el-icon-s-home',
    },
    children: [
      {
        path: 'table',
        component: () => import('@/pages/table/index.vue'),
        name: 'table',
        meta: {
          title: '表格',
          icon: 'el-icon-tickets',
        },
      },
      {
        path: 'project',
        component: () => import('@/pages/project'),
        name: 'project',
        meta: {
          title: '项目',
          icon: 'el-icon-folder-add',
        },
      },
      {
        path: 'echarts',
        component: () => import('@/pages/echarts'),
        name: 'echarts',
        meta: {
          title: '图形',
          icon: 'el-icon-magic-stick',
        },
      },
      {
        path: '/projectlist',
        name: 'projectlist',
        component: () => import('@/pages/projectList/index'),
        hidden: true,
      },
    ],
  },
]
