import { createRouter, createWebHistory } from 'vue-router';

import TvShowListView from '@/views/TvShowListView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: TvShowListView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
