import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "SpacePage",
    component: () => import("../components/SpacePage.vue"),
  },
  {
    path: "/mindnote/:mindnoteId",
    name: "MindnotePage",
    component: () => import("../components/MindnotePageX.vue"),
  },
];

export default createRouter({
  // mode: "history",
  history: createWebHistory("/aregrid-mindnote/#/"), //
  routes,
});
