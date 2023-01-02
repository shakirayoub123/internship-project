import {createRouter, createWebHistory} from "vue-router";
import homePage from "./components/HomePage.vue";

import updateTodo from "@/components/updateTodo.vue";
import addTodo from "@/components/addTodo.vue";

const routes = [
    {
        name: 'homepage',
        path: '/homePage',
        component: homePage,
    },

    {
        name: 'addTodo',
        path: '/addTodo',
        component: addTodo,
    },
    {
        name: 'updateTodo',
        path: '/updateTodo/:id',
        component: updateTodo,
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router