import { createRouter, createWebHashHistory } from "vue-router";
import Pipelines from "@/views/Pipelines.vue";
import Pipeline from "@/views/Pipeline.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: "pipelines",
      path: "/",
      component: Pipelines,
    },
    {
      name: "pipeline",
      path: "/:id",
      component: Pipeline,
    },
  ],
});
