import { createRouter, createWebHistory } from 'vue-router';

import TvShowListView from '@/views/TvShowListView.vue';
import EpisodeView from '@/views/EpisodeView.vue';

const routes = [
  {
    path: '/',
    name: 'tvShowDetail',
    component: TvShowListView,
  },
  {
    path: '/show',
    component: TvShowListView,
    children: [
      {
        path: '',
        component: TvShowListView,
      },
      {
        path: ':showName',
        component: TvShowListView,
      },
    ],
  },
  {
    path: '/episode/:episodeId',
    component: EpisodeView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
