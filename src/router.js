import Vue from "vue";
import Router from "vue-router";
import List from "@/components/List.vue";
import ChanceTest from "@/components/ChanceTest.vue";
import PerformanceTest from "@/components/PerformanceTest.vue";
import RandomGenerator from "@/components/RandomGenerator.vue";
import RandomGeneratorTableConverter from "@/components/RandomGeneratorTableConverter.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: List
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/generate/converter",
      name: "generator converter",
      component: RandomGeneratorTableConverter
    },
    {
      path: "/chance-test",
      name: "chance-test-converter",
      component: ChanceTest
    },
    {
      path: "/generate/:generatorId",
      name: "generator",
      component: RandomGenerator
    },
    {
      path: "/test",
      name: "test",
      component: PerformanceTest
    }
  ]
});
