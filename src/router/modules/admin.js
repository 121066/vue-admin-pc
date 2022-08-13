import Layout from '@/layout'
export const admin = [
  {
    path: '/admin',
    component: Layout,
    name: 'admin',
    redirect: '/admin/page',
    meta: {
      title: '管理员',
      icon: 'el-icon-s-custom',
    },
    children: [
      {
        hidden: true,
        path: 'page',
        name: 'page',
        component: () => import('@/pages/admin/index'),
        meta: {
          title: '管理',
        },
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/pages/admin/user'),
        meta: {
          title: '用户',
          icon: 'el-icon-s-check',
        },
      },
      {
        path: 'adduser',
        name: 'adduser',
        component: () => import('@/pages/admin/adduser'),
        meta: {
          title: '新增用户',
          icon: 'el-icon-coordinate',
        },
      },
    ],
  },
]
