import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../components/layout/MainLayout.vue"
import Home from '../views/home/Home.vue'
const routes = [
    {
        path: "/",
        name: "Auth",
        component: () => import("../views/auth/Auth.vue"),
        meta: {
            requiresAuth: false,
        },

    },
    {
        path: "/home",
        name: "home",
        component: MainLayout,
        children: [
            {
                path: '/home',
                component: Home
            },
        ]

    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.hash) {
            return { selector: to.hash };
        }
        return { left: 0, top: 0 };
    },
});


// TODO: check if user is authenticated
// router.beforeEach((to, from, next) => {
//     if (to.matched.some((record) => record.meta.requiresAuth)) {
//         if (store.getters["User/isLoggedIn"]) {
//             next();
//         }
//         next("/login");
//     } else {
//         next();
//     }
// });

export default router;
