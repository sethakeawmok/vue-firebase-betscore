import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import BetMatch from "../views/BetMatch.vue";
import Teams from "../views/Teams.vue";
import Team from "../views/Team.vue";

import { fb } from "../firebase";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/bet",
      name: "betmatch",
      component: BetMatch,
      meta: { requiresAuth: true }
    },
    {
      path: "/teams",
      name: "teams",
      component: Teams,
      meta: { requiresAuth: true }
    },
    {
      path: "/team/:team_name",
      name: "Team",
      component: Team,
      meta: { requiresAuth: true }
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next(); // make sure to always call next()!
  }
});
export default router;
