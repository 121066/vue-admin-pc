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
        path: '/table',
        component: (resolve) => require(['@/pages/table/index.vue'], resolve),
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
        path: 'editor',
        component: () => import('@/pages/editor'),
        name: 'editor',
        meta: {
          title: '富文本',
          icon: 'el-icon-s-order',
        },
      },
      {
        path: '/projectlists',
        name: 'projectlists',
        component: () => import('@/pages/projectList/index'),
        hidden: true,
      },
    ],
  },
]
