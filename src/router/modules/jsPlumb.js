import Layout from "@/layout/index.vue";

export const jsPlumb = [
  {
    path: "/jsplumb",
    component: Layout,
    name: "chart",
    meta: {
      title: "jsplumb关系图",
      icon: "el-icon-grape",
    },
    children: [
      {
        path: "/jsplumb/index",
        component: () => import("@/pages/jsPlumb/index.vue"),
        meta: {
          title: "关系图",
          icon: "el-icon-grape",
        },
      },
    ],
  },
];
