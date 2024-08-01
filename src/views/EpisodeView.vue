<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useTvShowStore } from '@/stores/tvShow';
import UpArrow from '@/components/atoms/icons/UpArrow.vue';
import type { TEpisode } from '@/types';
import DOMPurify from 'isomorphic-dompurify';

const tvShowStore = useTvShowStore();

const route = useRoute();
const router = useRouter();

const episode: TEpisode | null = tvShowStore.getEpisodeById(
  parseInt(route.params.episodeId as string),
);

if (!episode) router.push('/');
</script>

<template>
  <div v-if="episode" class="flex min-h-[100vh] flex-col justify-center bg-slate-800 text-white">
    <a
      @click="$router.back()"
      class="fixed left-10 top-10 -rotate-90 rounded-full bg-slate-100 p-6 text-slate-800 duration-200 ease-in-out hover:cursor-pointer hover:bg-opacity-65 max-md:hidden"
    >
      <UpArrow />
    </a>
    <div class="container flex flex-col gap-10 py-10 lg:gap-16">
      <div class="flex flex-wrap justify-center gap-10 font-mono text-3xl font-bold">
        <a :href="episode.url" class="text-center duration-300 ease-in-out hover:opacity-70"
          >#{{ episode.number }} {{ episode.name }}</a
        >
        <span class="rounded-lg bg-white px-3 py-2 text-sm font-bold text-slate-800">
          Season {{ episode.season }}
        </span>
      </div>
      <div v-if="episode.image" class="mx-auto max-w-96 border-4">
        <img class="w-full" :src="episode.image.original" alt="tvShowImage" />
      </div>
      <div
        class="px-14 text-center font-mono lg:text-lg"
        v-html="DOMPurify.sanitize(episode.summary)"
      ></div>
    </div>
  </div>
</template>
